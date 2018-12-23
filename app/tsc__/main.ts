import { app, BrowserWindow, Menu } from 'electron';
import { ProcessesHandle } from './subprocesses/ProcessHandle';
import {DBService} from './dbService';
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

    //checks for if the user has used the app for the first time
    var checkData = new DBService('./app/src/store/SystemInfoFile')
    var check = checkData.getStore('/')

    console.log(Object.keys(check).length);
    
    if(Object.keys(check).length === 0 ){
        mainWindow.loadURL('file://'+__dirname+'/views/onFirstStart/Welcome.html');
    }
    else{
        mainWindow.loadURL('file://'+__dirname+'/views/index.html');
    }

    mainWindow.webContents.openDevTools();
    Menu.setApplicationMenu(null);
});
