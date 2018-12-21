import { app, BrowserWindow, Menu } from 'electron';
import { ProcessesHandle } from './subprocesses/ProcessHandle';

var mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#fff',
        title: 'System Monitor | Welcome',
        height: 600,
        width: 800
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.loadURL('file://'+__dirname+'/views/index.html');
    mainWindow.webContents.openDevTools();
    Menu.setApplicationMenu(null);
});
