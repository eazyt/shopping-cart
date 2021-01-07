const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Product = require('../models/product')


const csrfProtection = csrf()
router.use(csrfProtection)



/* GET home page. */
router.get('/', function (req, res, next) {
  // insert future code
  Product.find((err, products) => { 
    let productsChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < products.length; i += chunkSize) { 
      // console.log(products + "THIS IS TITLES")
      productsChunks.push(products.slice(i, i + chunkSize));
    }
    // console.log(productsChunks[1] + 'THIS PRODUCTSCHUNKS')
    // console.log(productsChunks + 'THIS IS CHUNKS')
    res.render('main/index', {
      title: 'Shopping Cart',
      products: productsChunks
    });
  })

  // This works with
  //   <% products.forEach(function (product) { %>
  //        <%= product.imagePath %>
  //        <%= product.price %>
  //   <% } %>
  // Product.find((err, products) => { 
  //   res.render('main/index', {
  //     title: 'Shopping Cart',
  //     products: products
  //   });
  // })
  
});


router.get('/user/signup', (req, res) => { 
  const message = req.flash('errors');
  // const message = 'hello';
  console.log(message + 'FROM SIGNUP ROUTE')
  console.log(message.length)
  res.render('accounts/register', {
    message: message,
    csrfToken: req.csrfToken()
  })
})
// hasErrors: messages.length > 0,
// errors: req.flash('errors'),

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/signin',
  failureRedirect: '/user/signup',
  failureFlash: true
}))

router.get('/user/profile', (req, res) => {
  // const messages = 'Hello';
  const messages = req.flash('errors');
  res.render('accounts/profile', {
    messages: messages
  })
})

router.get('/user/signin', (req, res) => { 
    const message = req.flash('errors');
    // const message = 'hello';
    // console.log(message + 'FROM SIGNUP ROUTE')
    // console.log(message.length)
    res.render('accounts/login', {
      message: message,
      csrfToken: req.csrfToken()
    })
})

router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

module.exports = router;