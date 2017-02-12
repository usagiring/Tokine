/**
 * Created by Holo on 2017/2/7.
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const sessionStore = require('connect-mongo');

const maxBody = 500 * 1024 * 1024; // 500M

let app = express();

app.set('trust proxy', true);
app.use(compression());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: {
        write: message => {
            console.log(message);
        }
    }
}));
app.use(bodyParser.json({limit: maxBody}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({limit: maxBody}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({
    secret: 'I LOVE LOLI',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 * 24 * 7
    },
    store: getSessionStore()
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, '/../public/dist')));
app.use(cors({
    origin: true,
    credentials: true
}));
let routes = path.join(__dirname, './routes');
let apiArray = fs.readdirSync(routes);
for (let i = 0; i < apiArray.length; i++) {
    app.use('/api', require(path.join(routes, apiArray[i])));
}

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    logger.error(`404: ${err}`);
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        logger.error(`500: ${err}`);
        res.status(err.status || 500);
        res.json(err);
    });
}

app.use(function (err, req, res, next) {
    logger.error(`500: ${err}`);
    res.status(err.status || 500);
    res.json(err);
});

function getSessionStore() {
    const MongoStore = sessionStore(session);
    return new MongoStore({mongooseConnection: mongoose.connection});
}

module.exports = app;