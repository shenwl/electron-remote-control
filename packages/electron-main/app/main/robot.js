const { ipcMain } = require('electron');
const { IPC_EVENTS } = require('../common/constants');
const robot = require('robotjs');
const vkey = require('vkey');

function handleMouse({ x, y }) {
  robot.moveMouse(x, y);
  robot.mouseClick();
}

function handleKey({ meta, alt, ctrl, shift, keyCode }) {
  const modifiers = [];
  if (meta) modifiers.push('meta');
  if (alt) modifiers.push('alt');
  if (ctrl) modifiers.push('ctrl');
  if (shift) modifiers.push('shift');
  let key = vkey[keyCode].toLowerCase();
  robot.keyTap(key, modifiers);
}

module.exports = () => {
  // data: {x, y}/{keyCode, meta(true/false), alt, ctrl, shift}
  ipcMain.on(IPC_EVENTS.ROBOT, (e, type, data) => {
    if (type === 'mouse') {
      handleMouse(data);
      return;
    }
    if (type === 'key') {
      handleKey(data);
    }
  });
}