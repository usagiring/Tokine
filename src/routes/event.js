/**
 * Created by RedMoon on 2017/2/27.
 */

module.exports = (router, middleware) => {
    router.get('/event', event);
};

const test = require('../lib/test/test.domain');

function event(req, res) {
    test.view();
    res.sendStatus(200);
}