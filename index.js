var express = require('express');

var app = express();

var port = process.env.port || 15987;

app.get('/', (req, res) => {
    res.send("hello world!");
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log("App running on port: " + port);
});