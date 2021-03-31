var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var validate = require('mongoose-validator');
// var bootstrap = require('bootstrap'); 


// It's very important to require dotenv before any other module
// that depends upon the properties added to process.env 
require('dotenv').config();

// config/database depends upon process.env.DATABASE_URL
require('./config/database');

// Our config/passport configures passport
require('./config/passport');

var indexRouter = require('./routes/index');
var photosRouter = require('./routes/photos');
var reviewsRouter = require('./routes/reviews');
var photographersRouter = require('./routes/photographers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Tells express to begin search for static assets, like images, in the public folder.
// Now src= for static assets is formatted as "/images/landscape.svg"
app.use(express.static('public')); 

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// app.use(session({... code above
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/photos', photosRouter);
app.use('/', reviewsRouter);
app.use('/', photographersRouter);

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

// Examples of mongoose-validator
// var nameValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [3, 50],
//     message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
//   }),
//   validate({
//     validator: 'isAlphanumeric',
//     passIfEmpty: true,
//     message: 'Name should contain alpha-numeric characters only',
//   }),
// ]
 
// var Schema = new mongoose.Schema({
//   name: { type: String, required: true, validate: nameValidator },
// });


module.exports = app;
