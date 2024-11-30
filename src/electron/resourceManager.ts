import fs from 'fs';
import osUtils from 'os-utils';
import os from 'os';
import { BrowserWindow } from 'electron';
const POLLING_INTERVAL = 500;

function getCpuUsage(){
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamUsage(){
    //the freememPercantage gives us the value of the freemem which is between 
    //on subtracting it from we will get the used amount of ram
    return 1 - osUtils.freememPercentage();
}

function getStorageData(){
    //statfsSync give stats about the specific  region on the file system
    // "c://" means our C entire C dive
    const stats = fs.statfsSync(process.platform === 'win32'? 'C://': '/');
    // "bsize" is the size of each block of memory on our machine
    // "stats.block" is teh number of total block in the specified path
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    
    const totalInGB = Math.floor(total/1_000_000_000);
    const freeInGB = Math.floor(free/1_000_000_000);
    
    return {
        //here dividing it with 1,000,000,000 to convert it into Gb as it is actually in bytes
        //floor to get and integer value instead of floating value
        total: totalInGB,
        free: freeInGB,
        usage: totalInGB - freeInGB,
    }
}


// we need to pass the mainWindows as a argument because we are not in its scope
export function pollResources(mainWindow: BrowserWindow){
    setInterval(
        async() => {
            const cpuUsage = await getCpuUsage();
            const ramUsage = getRamUsage();
            const storageUsage = getStorageData();

            //this just means that for every 0.5sec on and eventbus call statistics we are sending the data mention it
            mainWindow.webContents.send('statistics', {
                CpuUsage: cpuUsage,
                RamUsage: ramUsage,
                StorageUsage: storageUsage.usage
            })
        }, POLLING_INTERVAL);
}

export function getStaticData(){
    const totalStorage = getStorageData().total;
    const cupModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem()) / 1024;

    return ({
        totalStorage,
        cupModel,
        totalMemoryGB
    })
}