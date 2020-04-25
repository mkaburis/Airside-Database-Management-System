const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');

const routeList = require('./routes');

const app = express();
app.use(logger('dev', { immediate: true }));
app.use(flash());
app.use(session({
  secret: 'airport813',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routeList(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
