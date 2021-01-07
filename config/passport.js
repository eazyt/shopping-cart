var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
const { checkBody, validationErrors} = require('express-validator')

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//Middleware
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passwordField2: 'password2',
  passReqToCallback: true
}, function (req, email, password, done) {
    req.checkBody('name', 'Name is required!').notEmpty().isLength({min: 3 });
    req.checkBody('email', 'Email is required!').isEmail();
    // req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty().isLength({min: 5 });
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = req.validationErrors();
    console.log(errors + 'SIGNUP FROM PASSPORT')


    if (errors) {
      let message = [];
      errors.forEach(error => {
        message.push(error.msg)
      });
      return done(null, false, req.flash('errors', message))

    }
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, false, req.flash('errors', 'User with that email already exist'))
        // return done(null, false, req.flash('message', 'Email already exist))
      }
    })
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, result) => {
          if (err) return done(err);
          return done(null, newUser)
        })
        
}))
      
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  // req.checkBody('name', 'Name is required!').notEmpty().isLength({min: 3 });
  req.checkBody('email', 'Email is required!').isEmail();
    // req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    // req.checkBody('password2', 'Passwords do not match!').equals(password);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = req.validationErrors();
    console.log(errors + 'SIGNIN FROM PASSPORT')

    
    if (errors) {
      let message = [];
      errors.forEach(error => {
        message.push(error.msg)
      });
      return done(null, false, req.flash('errors', message))
      
    }
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, req.flash('errors', 'User with that email does not exists'))
        // return done(null, false, req.flash('message', 'Email already exist))
      }
      if (!user.validatePassword(password)) {
        return done(null, false, req.flash('errors', 'Wrong Username and/orPassword'));
      }
      return done(null, user)
    })
    
}))
  
  
  
  
  
//custom function to validate
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
