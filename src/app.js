/**
 * Created by Holo on 2017/2/6.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');

module.exports = {
    createServer,
    start
};

function createServer() {
    let express = require('./express');
    let webSocket = require('./webSocket');
    let server = http.createServer(express);
    webSocket.init(server);

    return server;
}

function start(server, port) {
    server.listen(port, () => {
        console.log('start app');
    });
}