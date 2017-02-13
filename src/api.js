/**
 * Created by RedMoon on 2017/2/12.
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
let router = express.Router();

module.exports = router;

let routes = path.join(__dirname, './routes');
let apiArray = fs.readdirSync(routes);
apiArray.forEach(api => require(path.join(routes, api))(router, middleware));

function middleware() {

}