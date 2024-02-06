require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const supabase = require('./supabaseConfig')
// Optimization
const compression = require("compression");
const helmet = require("helmet");

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');

const app = express();

app.use(cors());

// Set up rate limiter: maximum of sixty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(async (req, res, next) => {
  // Get user session info to use in authentication
  const { data, error } = await supabase.auth.getSession()
  if (data.session) {
    req.user = data.session.user;
    req.token = data.session.access_token;
  }
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);



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
