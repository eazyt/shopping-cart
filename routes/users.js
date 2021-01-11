const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Order = require('../models/order')
const Cart = require('../models/cart')



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

  Order.find({ user: req.user }, (err, orders) => { 
    if (err) { 
      console.log(err)
    }
    let cart;
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });

    res.render('accounts/profile', {
      orders: orders,
    });

  })
})


// router.get('/logout', function (req, res) {
//   console.log("I\'m Out!!!!")
//   req.session.destroy(function () {
//     res.redirect('/');
//   });
// });
  
  router.get('/logout', isLoggedIn, (req, res, next) => {
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
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
    let oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  res.redirect('/user/profile')
  // successRedirect: '/user/profile'
})



router.get('/signin', (req, res) => {
  const message = req.flash('errors');
  res.render('accounts/login', {
    message: message,
    csrfToken: req.csrfToken()
  })
})

router.post('/signin', passport.authenticate('local.signin', {
  
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res, next) { 
    if (req.session.oldUrl) { 
    let oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
    }
    res.redirect('/user/profile')
    // successRedirect: '/user/profile'
})


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
