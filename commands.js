var express = require('express');

var exp = express();
exp.use(require('body-parser').json());
exp.use(require('cors')());

var { spawn } = require('child_process');
const { Stream } = require('stream');

var java;
var socket;

var port = 15987;

var isStarted = false;

var server;

startserver = () => {
    server = exp.listen(port, (err) => {
        if (err) throw err;
        console.log("App running on port: " + port);
        java = spawn("java", [ "-cp", "jrobot", "robot" ]);
        startJava();
        socket = require('socket.io')(server, {
            cors: {
              origin: '*',
            }
        });
        startSocket();
    });
    isStarted = true;
};

stopserver = () => {
    socket = null;
    server.close();
    java.kill('SIGINT');
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

startJava = () => {
    java.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    java.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    java.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    //process.stdin.pipe(java.stdin);
    //java.stdin.write("hello there general kenobi\n");
}

startSocket = () => {
    socket.on('connection', client => {
        console.log("client connected");
        client.on('disconnect', () => {
            console.log("client disconneectd");
        });
        client.on('btn', (data) => {
            console.log((new Date).getTime());
            java.stdin.write(data+"\n");
        })
    });
}