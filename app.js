const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const expressHandlebars  = require('express-handlebars');
const fileUpload = require('express-fileupload');

global.appRoot = path.resolve(__dirname);

// init settings and collections
const settings = require('./modules/settingsLoader');
const collections = require('./modules/collections');
collections.init();

const viewsRouter = require('./routes/views');
const uploadRouter = require('./routes/upload');
const apiRouter = require('./routes/restApi');

const app = express();

// view engine setup
const viewEngine = expressHandlebars({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: settings.viewsPath,
    partialsDir: settings.partialsPath,
});
app.set('views', settings.viewsPath);
app.engine('hbs', viewEngine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: settings.staticPath,
  dest: settings.staticPath,
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(settings.staticPath));
app.use(fileUpload());

app.use('/hbs', viewsRouter);
app.use('/api', apiRouter);
app.use('/upload', uploadRouter);

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
