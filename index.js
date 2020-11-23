const { app , BrowserWindow } = require('electron');
var express = require('express');

var exp = express();

var port = process.env.port || 15987;

exp.use(express.static(__dirname + '/public'));

exp.listen(port, (err) => {
    if (err) throw err;
    console.log("App running on port: " + port);
});

createwindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://localhost:' + port);
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