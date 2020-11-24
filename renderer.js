const { Renderer, ipcRenderer } = require("electron");

var $ = require('jquery');

var isStarted = false;

changeServer = () => {
    (!isStarted)?startServer():stopServer();
}

startServer = () => {
    ipcRenderer.send('startserver');
    isStarted = true;
    $("#serverbtn").text("Stop Server");
}
stopServer = () => {
    ipcRenderer.send('stopserver');
    isStarted = false;
    $("#serverbtn").text("Start Server");
}
changePort = () => {
    ipcRenderer.send('changeport', $("#port").val());
}

module.exports = Renderer;