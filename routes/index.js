const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')

const Product = require('../models/product')


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
    // console.log(productsChunks[0] + 'THIS PRODUCTSCHUNKS')
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

// router.get('/add-to-cart/:id', function (req, res, next) {
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : {});

//   Product.findById(productId, function (err, product) {
//     if (err) {
//       return res.redirect('/');
//     }
//     cart.add(product, product.id);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/');
//   });
// });






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



module.exports = router;