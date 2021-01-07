const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');



const csrfProtection = csrf()
router.use(csrfProtection)


// router.get('/logout', isLoggedIn, (req, res) => {
  // res.send({message: 'Hello'})
  // const messages = 'Hello';
  // const messages = req.flash('errors');
  // res.render('accounts/profile', {
  //   messages: messages
  // })
// })
router.get('/profile', isLoggedIn, (req, res) => {
  // const messages = 'Hello';
  const messages = req.flash('errors');
  res.render('accounts/profile', {
    messages: messages
  })
})

// router.get('/logout', function (req, res) {
//   console.log("I\'m Out!!!!")
//   req.session.destroy(function () {
  //     res.redirect('/');
  //   });
  // });
  
  router.get('/logout', function (req, res, next) {
    console.log("I\'m Out!!!!")
  req.logout();
  res.redirect('/');
});

router.use('/', isNotLoggedIn, (req, res, next) => { 
  next()
})


router.get('/signup', (req, res) => {
  const message = req.flash('errors');
  console.log(message + 'FROM SIGNUP ROUTE')
  console.log(message.length)
  res.render('accounts/register', {
    message: message,
    csrfToken: req.csrfToken()
  })
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/signin',
  failureRedirect: '/user/signup',
  failureFlash: true
}))



router.get('/signin', (req, res) => {
  const message = req.flash('errors');
  // const message = 'hello';
  // console.log(message + 'FROM SIGNUP ROUTE')
  // console.log(message.length)
  res.render('accounts/login', {
    message: message,
    csrfToken: req.csrfToken()
  })
})

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))



// exports.logout = function (req, res) {
//   req.session.destroy(function () {
//     res.redirect('/');
//   });
// };

module.exports = router;

function isNotLoggedIn(req, res, next) { 
  if (!req.isAuthenticated()) { 
    return next()
  }
  res.redirect('/')
}

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated()) { 
    return next()
  }
  res.redirect('/')
}
