var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');
var Product = require('../models/product');

router.get('/', function(req, res, next) { 
	return res.render('user');
});

router.get('/payment/:id', function(req, res, next) { 
	return res.render('payment');
});

module.exports = router;