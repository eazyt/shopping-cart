const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const config = require('../config/secret')
const Order = require('../models/order')

const Publishable_Key = config.stripePublishableKey
const stripe = require('stripe')(config.stripeSecretKey)

const Product = require('../models/product')



/* GET home page. */
router.get('/', function (req, res, next) {
  // insert future code
  Product.find((err, products) => { 
    let successMsg = req.flash('success')[0];
    let errorMsg = req.flash('error')[0]
    let productsChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < products.length; i += chunkSize) { 
      productsChunks.push(products.slice(i, i + chunkSize));
    }

    res.render('main/index', {
      title: 'Shopping Cart',
      products: productsChunks,
      successMsg: successMsg,
      noMessages: !successMsg,
      message: successMsg,
      error: errorMsg
    });
  })
});


router.get('/add-to-cart/:id', (req, res, next) => { 
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});


  Product.findById(productId, (err, product) => { 
    if (err) { 
      return res.redirect('/');
    }

    cart.add(product, product.id);
    req.session.cart = cart;

    // console.log(req.session.cart)

    res.redirect('/')
  })
})

router.get('/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});


router.get('/shopping-cart', isLoggedIn, function (req, res, next) {
  // if (!req.session.cart) {
  //   let error = req.flash('error', 'oops!!')[0]
  //   return res.render('main/empty-shopping-cart', {
  //     products: 0,
  //     error: error
  //     // error: 'No items in cartz'
  //   });
  // }
  // if (!req.session.cart) {
  //   return res.render('main/empty-shopping-cart', {
  //     products: 0,
  //     errors: req.flash('errors', 'oops!!')[1]
  //     // errors: 'No items in cartz'
  //   });
  // }
  let cart = new Cart(req.session.cart);
  res.render('main/shopping-cart', {
    key: Publishable_Key,
    products: cart.generateArray(),
    totalPrice: Math.floor(cart.totalPrice).toFixed(2),
    name: req.body.name,
    errors: req.flash('errors')
  });
});

router.post('/checkout', isLoggedIn, function (req, res) {
    if (!req.session.cart) {
      return res.render('main/shopping-cart', {
        products: null,
        errors: req.flash('errors')
      });
  };

  let cart = new Cart(req.session.cart);

  
   // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({
    source: req.body.stripeToken,
    name: req.body.name,
    email: req.body.email,
    address: {
      line1: req.body.address_street,
      postal_code: req.body.address_postal_code,
      city: req.body.city,
      state: req.body.address_state,
      country: req.body.address_country,
    }
  })
  .then((customer) => {
      return stripe.charges.create({
        amount: req.body.amount * 100,
        currency: 'USD',
        customer: customer.id
      });
    })
    .then((err, charge) => {
      const order = new Order();
      order.user = req.user;
      order.cart = cart;
      order.name = req.body.name;
      // order.paymenetId= charge._id;
      order.street = req.body.address_street;
      order.city = req.body.address_city;
      order.zip_code = req.body.address_postal_code;
      order.state = req.body.address_state;
      order.country = req.body.address_country;
      
      order.save((err, result) => {
        if (err) { 
          let error = req.flash('error', err.message);
          res.render('main/error', {
            error: error
          })
        }
        req.session.cart = null;
        req.flash('success', 'Thank you for shopping with us!!!');
        res.redirect('/');
      });

    })
    .catch((err) => { 
      req.flash('error', err.message);
      return res.redirect('/shopping-cart');
    })
})

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}