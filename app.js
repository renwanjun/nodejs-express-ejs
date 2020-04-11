var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entries=require('./routes/entries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 程序输出json格式更易读
app.set('json spaces',2)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 开启扩展的消息体解析器
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件路径 js css image

// app.use('/', entries.list);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// app.get('/',entries.list)
// app.get('/post',entries.form);
// app.post('/post',entries.submit)

module.exports = app;
