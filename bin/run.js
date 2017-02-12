/**
 * Created by RedMoon on 2017/2/7.
 */

const app = require('../src/app');

let port = 3000;
if(process.argv[2]){
    port = process.argv[2];
}

app.start(app.createServer(), port);
