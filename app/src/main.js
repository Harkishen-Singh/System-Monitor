"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
var mainWindow = null;
electron_1.app.on('ready', () => {
    mainWindow = new electron_1.BrowserWindow({
        backgroundColor: '#fff',
        title: 'System Monitor | Welcome',
        height: 600,
        width: 800
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.loadURL('file://' + __dirname + '/views/index.html');
    mainWindow.webContents.openDevTools();
    electron_1.Menu.setApplicationMenu(null);
});
