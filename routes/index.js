const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const csrf = require('csurf')

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
    console.log(productsChunks[1] + 'THIS PRODUCTSCHUNKS')
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
  res.render('accounts/register', {
    csrfToken: req.csrfToken()
  })
})

router.post('/user/signup', (req, res) => { 
  res.redirect('/')
})

module.exports = router;