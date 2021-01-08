const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const config = require('../config/secret')

const Publishable_Key = config.stripePublishableKey
const stripe = require('stripe')(config.stripeSecretKey)

const Product = require('../models/product')



/* GET home page. */
router.get('/', function (req, res, next) {
  // insert future code
  Product.find((err, products) => { 
    let successMsg = req.flash('success')[0];
    let productsChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < products.length; i += chunkSize) { 
      // console.log(products + "THIS IS TITLES")
      productsChunks.push(products.slice(i, i + chunkSize));
    }
    // console.log(productsChunks[0] + 'THIS PRODUCTSCHUNKS') 
    // console.log(productsChunks + 'THIS IS CHUNKS')
    res.render('main/index', {
      title: 'Shopping Cart',
      products: productsChunks,
      successMsg: successMsg,
      noMessages: !successMsg,
      message: successMsg
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


router.get('/add-to-cart/:id', (req, res, next) => { 
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});


  Product.findById(productId, (err, product) => { 
    if (err) { 
      return res.redirect('/');
    }

    cart.add(product, product.id);
    req.session.cart = cart;

    console.log(req.session.cart)

    res.redirect('/user/profile')
  })
})


router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('main/shopping-cart', {
      products: null
    });
  }
  let cart = new Cart(req.session.cart);
  res.render('main/shopping-cart', {
    key: Publishable_Key,
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

// router.get('/checkout', (req, res, next) => {
//     if (!req.session.cart) {
//       return res.redirect('/shopping-cart');
//   }
    
//     let cart = new Cart(req.session.cart);
//     let errMsg = req.flash('error')[0];
//     res.render('main/checkout', {
//       total: cart.totalPrice,
//       errMsg: errMsg,
//       noError: !errMsg,
      
//     });
    
// });

router.post('/checkout', function (req, res) {
    if (!req.session.cart) {
      return res.render('main/shopping-cart', {
        products: null
      });
  };

  let cart = new Cart(req.session.cart);
  
   // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({
      source: req.body.stripeToken,
      name: req.body.email,
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
      if (err) req.flash('error', err.message);
   
      req.session.cart = null;
      // req.flash('success', 'Successfully bought product!!!');
      // return res.redirect('/');
      // res.render('main/index', {
      //   message: req.flash('success', 'Successfully bought product!!!')
      // })
      res.redirect('/')
    })
    
})

module.exports = router;