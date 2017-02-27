/**
 * Created by RedMoon on 2017/2/7.
 */

module.exports = {
    view
}

const eventEmitter = require('../service/eventEmitter');

function view() {
    eventEmitter.emit('event');

    console.log('test view');
}