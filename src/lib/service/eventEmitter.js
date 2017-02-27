/**
 * Created by RedMoon on 2017/2/27.
 */

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}

let myEmitter = new MyEmitter();

module.exports = myEmitter;