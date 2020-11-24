const { app , BrowserWindow, ipcMain } = require('electron');
const { startserver } = require('./commands');

var com = require('./commands');

createwindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile(__dirname + '/public/index.html')
    win.focus();
    win.webContents.openDevTools();
};

app.whenReady().then(createwindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0)
        createwindow();
});

ipcMain.on('startserver', (Event) => {
    com.startserver(); 
});

ipcMain.on('stopserver', (Event) => {
    com.stopserver(); 
});

ipcMain.on('changeport', (Event, arg) => {
    com.changeport(arg); 
});