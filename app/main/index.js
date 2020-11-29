const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function listenIpcMessage() {
  ipcMain.handle('hello', (payload) => {
    console.log(111, payload)
  });
}

let win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 600,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  if (isDev) {
    win.loadURL("http://localhost:8000");
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/main/index.html'));
  }
  listenIpcMessage();
})