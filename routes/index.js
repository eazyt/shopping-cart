const express = require('express');
const router = express.Router();
const Product = require('../models/product')

/* GET home page. */
router.get('/', function (req, res, next) {
  // insert future code
  Product.find((err, products) => { 
    let productsChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < products.length; i += chunkSize) { 
      productsChunks.push(products.slice(i, i + chunkSize));
    }
    res.render('main/index', {
      title: 'Shopping Cart',
      products: productsChunks
    });
  })
});

module.exports = router;