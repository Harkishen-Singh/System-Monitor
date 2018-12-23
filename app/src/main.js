"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const dbService_1 = require("./dbService");
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
    //checks for if the user has used the app for the first time
    var checkData = new dbService_1.DBService('./app/src/store/SystemInfoFile');
    var check = checkData.getStore('/');
    console.log(Object.keys(check).length);
    if (Object.keys(check).length === 0) {
        mainWindow.loadURL('file://' + __dirname + '/views/onFirstStart/Welcome.html');
    }
    else {
        mainWindow.loadURL('file://' + __dirname + '/views/index.html');
    }
    mainWindow.webContents.openDevTools();
    electron_1.Menu.setApplicationMenu(null);
    mainWindow.setMenu(null);
});
