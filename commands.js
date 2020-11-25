var express = require('express');

var exp = express();
exp.use(require('body-parser').json());

var { spawn } = require('child_process');
const { Stream } = require('stream');

var java;

var port = 15987;

var isStarted = false;

var server;

startserver = () => {
    server = exp.listen(port, (err) => {
        if (err) throw err;
        console.log("App running on port: " + port);
        java = spawn("java", [ "-cp", "jrobot", "robot" ]);
        startJava();
    });
    isStarted = true;
};

stopserver = () => {
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
    java.stdin.write("hello there general kenobi\n");
}