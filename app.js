const createError = require('http-errors');
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db=require('./helper/databaseConnect')();
const bodyparser=require('body-parser')
const config=require('./config')
const verifyToken=require('./middleware/verify-token')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movieRouter= require('./routes/movies');
const directorRouter=require('./routes/directors')


const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('api_secret_key',config.secret_api_key)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.use('/api',verifyToken)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies',movieRouter);
app.use('/api/directors',directorRouter)

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
  res.json({error:err.message});
});

app.listen(5025)

module.exports = app;
