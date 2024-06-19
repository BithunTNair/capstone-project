var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const sellerRouter = require('./routes/seller');
const authRouter = require('./routes/auth');
const paymentsRouter = require('./routes/payments');
const reviewsRouter = require('./routes/reviews');
const recommendationsRouter = require('./routes/recommendations');


connectDB();
var app = express();



app.use(cors({
  origin: [ 'capstone-project-fe-plum.vercel.app']
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/seller', sellerRouter);
app.use('/auth', authRouter);
app.use('/payments', paymentsRouter);
app.use('/reviews', reviewsRouter);
app.use('/recommendations', recommendationsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500).json({ message: 'something went wrong' });

});

module.exports = app;
