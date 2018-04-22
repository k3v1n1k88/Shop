var express = require('express');
var router = express.Router();

var fs = require('fs');

//var Cart = require('../models/cart'); <- model cart
var products = [] //Fetch data at here

router.get('/', function (req, res, next) {
  res.render('index', 
  { 
    title: 'Trilpe Shop',
    products: products
  }
  );
});

router.get('/header', function (req,res,next) {
  res.render('Header');
});

module.exports = router;
