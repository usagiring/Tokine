/**
 * Created by RedMoon on 2017/2/7.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const gridFSStream = require('gridfs-stream');
const mongoose = require('mongoose');
const config = require('../../../config/mongodb');

mongoose.Promise = global.Promise;
gridFSStream.mongo = mongoose.mongo;

module.exports = {
    getConnectUrl,
    connect,
    getFileById
};

function getConnectUrl() {
    let url = 'mongodb://';
    if (config.user) url += config.user;
    if (config.password) url += ':' + config.password + '@';
    url += config.host + ':' + config.port;
    let replicaSet = config.replicaSet;
    if (replicaSet && Array.isArray(replicaSet)) replicaSet.forEach(item => url += `,${item.host}:${item.port}`);
    url += '/' + config.name;
    if (replicaSet.length) url += `?replicaSet=${config.setName}`;
    return url;
}

function connect() {
    return new Promise((resolve, reject) => {
        let url = getConnectUrl();
        mongoose.connection.on('error', function (error) {
            reject(error);
        });
        mongoose.connection.once('open', function () {
            resolve(url);
        });
        mongoose.connect(url, {
            user: config.user,
            pass: config.password,
            server: {poolSize: 20},
            db: {native_parser: false}
        });
    })
}

function getFileById(id) {
    let gfs = new gridFSStream(mongoose.connection.db);
    let readOptions = {
        _id: id
    };
    return gfs.createReadStream(readOptions);
}