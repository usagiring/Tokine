/**
 * Created by Holo on 2017/2/7.
 */

module.exports = {
    init
};

function init(server) {
    if (!server) return;

    let io = require('socket.io')(server);
    io.on('message', message => {

    });
    io.on('anything', data => {

    });
    io.on('connection', socket => {
        console.log('socket.io connect...');
        socket.on('disconnect', () => {
            console.log('socket.io disconnect...');
        });

        socket.on('notification', notification => {
            socket.emit('notification', notification);

        });
    });
}