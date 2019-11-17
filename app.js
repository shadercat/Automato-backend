var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var secrets = require('./secrets'); //this file doesn't exist in github repository, but there is a file example (secretExample)
var constants = require('./constants/paths');

var app = express();
app.use(session({
    secret: secrets.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: constants.urlToDatabase,
    })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3001']);
    res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
