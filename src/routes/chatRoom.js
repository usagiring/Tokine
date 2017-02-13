/**
 * Created by RedMoon on 2017/2/13.
 */

module.exports = (router, middleware) => {
    router.get('/chat_room', chatRoom);
};

function chatRoom(req, res) {
    res.send('hello world');
}