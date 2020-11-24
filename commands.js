var express = require('express');

var exp = express();
exp.use(require('body-parser').json());

var port = 15987;

var isStarted = false;

var server;

startserver = () => {
    server = exp.listen(port, (err) => {
        if (err) throw err;
        console.log("App running on port: " + port);
    });
    isStarted = true;
};

stopserver = () => {
    server.close();
    isStarted = false;
    console.log("App closed")
}

changeport = (p) => {
    port = p;
    if(isStarted){
        stopserver();
        startserver();
    }
}

module.exports = {
    startserver,
    stopserver,
    changeport
};