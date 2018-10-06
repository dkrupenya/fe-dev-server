const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const expressHandlebars  = require('express-handlebars');

global.appRoot = path.resolve(__dirname);

// const collections = require('./modules/collections');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const viewsRouter = require('./routes/views');

const settings = require('./modules/settingsLoader');

const app = express();

// const settings = require('./settings');
// console.log(settings, collections.map);

// view engine setup
const viewEngine = expressHandlebars({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: settings.viewsPath,
    partialsDir: settings.partialsPath,
});

app.engine('handlebars', viewEngine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/hbs', viewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
