const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let win;
function create() {
  win = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  if (isDev) {
    win.loadURL("http://localhost:8000/control");
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/main/control.html'));
  }
}

function send(channel, ...args) {
  win.webContents.send(channel, ...args);
}

module.exports = {
  create,
  send,
}