import { app, BrowserWindow, Menu} from "electron";
import {DBService} from './dbService';
import { ProcessesHandle } from './subprocesses/ProcessHandle';

let mainWindow = null;

app.on('ready', () => {
    
    mainWindow = new BrowserWindow({
        backgroundColor: '#fff',
        height: 600,
        title: 'System Monitor | Welcome',
        width: 800
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // checks for if the user has used the app for the first time
    const checkData = new DBService('./app/src/store/SystemInfoFile')
    const check = checkData.getStore('/')
    
    if (Object.keys(check).length === 0 ) {
        mainWindow.loadURL('file://'+__dirname+'/views/onFirstStart/Welcome.html');
    }
    else{
        mainWindow.loadURL('file://'+__dirname+'/views/index.html');
    }

    mainWindow.webContents.openDevTools();
    Menu.setApplicationMenu(null);
    mainWindow.setMenu(null);
});
