var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');

router.get('/:id', function(req, res, next) { 
	return res.render('orderdetail');
});

router.post('/payment/:id', function(req, res, next) {
	req.session.cartList = []; 
	return res.render('cart');
});

module.exports = router;