import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';

app.on('ready', () =>{
    const mainWindow = new BrowserWindow({
        webPreferences:{
            preload: getPreloadPath(),
        }
    });

    if(isDev()){
        mainWindow.loadURL("http://localhost:5123");
    }else{
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    console.log("Static data: ", getStaticData());
    pollResources(mainWindow);
    

    //".handle" excepts for the request sent by the ui to be handled 
    //where as ".on" does excepts it to be handled it is like udp type of communication
    ipcMain.handle("getStaticData", ()=>{
        return getStaticData();
    });
})

