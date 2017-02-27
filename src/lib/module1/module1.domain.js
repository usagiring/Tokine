/**
 * Created by RedMoon on 2017/2/27.
 */

module.exports = {
    view
}

const eventEmitter = require('../service/eventEmitter');

function view() {
    eventEmitter.on('event', () => {
        console.log('an event occurred!');
    });
    console.log('module1 view');
}