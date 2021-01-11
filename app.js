var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const engine = require('ejs-mate');
const secret = require('./config/secret')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const passport = require('passport')
const validator = require('express-validator')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const PORT = process.env.PORT || 3020; 

mongoose.connect(secret.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log(`succefully connected to the Database`)
  })
  .catch((e) => {
    console.log(`could not connect to database`, e)
  })

require('./config/passport')

// view engine setup
// app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  cookie: {
    maxAge: 14 * 24 * 60 * 1000, // 14h 24m 60s 1000ms = 14 day
    httpOnly: true
  },
  store: new MongoStore({
    url: secret.database,
    autoReconnect: true
  })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// for the user dropdown menu
app.use((req, res, next) => {
  // req.session.user = user;
  res.locals.user = req.user;
console.log(req.user)

next()
})
app.use((req, res, next) => {
  // req.session.user = user;
  res.locals.user = req.user;
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;

next()
})





// app.use((req, res, next) => { 
//   if (req.user) { 
//     console.log('THERE IS A REQ.USER!!!!!!');
//   } else {
    
//     console.log('NO REQ.USER FOUND!!!!!');
//   }
//   next()
// })


// app.use((req, res, next) => { 
//   if (req.session) {
//     console.log('THERE IS REQ.SESSION');
//   } else { 

//     console.log('THERE IS NO REQ.SESSSION');
//   }
//   next()
// })
// app.use((req, res, next) => { 
//   if (user) {
//     console.log('THERE IS REQ.SESSION.USER');
//   } else { 

//     console.log('THERE IS NO REQ.SESSSION.USER');
//   }
//   next()
// })



// app.get('*', function (req, res, next) {
//   // res.locals.cart = req.session.cart;
//   res.locals.user = req.user;
//   next();
// });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //  taking care of flash message to show on all templates
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");

  // render the error page
  res.status(err.status || 500);
  res.render('main/error', {
    errors: errors
  });
});


app.use('/user', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// module.exports = app;
app.listen(PORT, () => { 
  console.log(`App running and listening on port ${PORT}`)
})
