/**
 * Created by RedMoon on 2017/2/7.
 */

module.exports = (router) => {
    router.get('/test', helloWorld);
};

function helloWorld(req, res) {
    res.send('hello world');
}