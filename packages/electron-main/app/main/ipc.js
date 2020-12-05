const { IPC_EVENTS, CONTROL_TYPE } = require('../common/constants');
const { ipcMain } = require('electron');
const { send: sendMainWindow } = require('./windows/main');
const { create: createControlWindow } = require('./windows/control');

function initIpc() {
  ipcMain.handle(IPC_EVENTS.LOGIN, () => {
    // @todo mock
    const code = Math.floor(Math.random() * (999999 - 100000)) + 10000;
    return code;
  });
  ipcMain.on(IPC_EVENTS.CONTROL, async (e, remoteCode) => {
    // @todo mock
    sendMainWindow(IPC_EVENTS.CONTROL_STATE_CHANGE, remoteCode, CONTROL_TYPE.CONTROL);
    createControlWindow();
  });
}

module.exports = {
  initIpc,
};