/**
 * Created by Holo on 2017/2/6.
 */

const _ = require('lodash');
const os = require('os');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports = {
    createServer,
    start
};

function createServer() {

}

function start(server, port) {
    server.listen(port, () => {
    });
}