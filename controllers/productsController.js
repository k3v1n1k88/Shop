var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');
var Product = require('../models/product');

router.get('/', function(req, res, next) { 
	return res.redirect('/products/page=1');
});

router.get('/page=:id', function(req, res, next) { 
	var id = req.params.id;
	if (id <= 0) {
		return res.render('products');
	}
	var start = 9 * (id - 1);
	productRepo.loadAllProducts()
		.then(prods => {
			console.log("Loaded all product.");
				// console.log(prods);
			var list13 = [];
			var list46 = [];
			var list79 = [];
			var count = [];
			var i = start;
			var max = i + 3;
			while (i < max) {
				list13.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list46.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list79.push(prods[i]);
				i += 1;
			}
			var len = prods.length;
			i = 1;
			while (len > 0) {
				count.push(i);
				len -= 9;
				console.log(len);
				i += 1;
			}
			var quantity = [];
			quantity.push(prods.length);
			return res.render('products', {
				products13: list13,
				products46: list46,
				products79: list79,
				pages: count,
				quantity: quantity
			});
		})
		.catch(err => {

			console.log('Error: ' + err);
			return 	res.render('products', {
					products13: null,
					quantity: 0,
					pages: null
			});
		});	

});

module.exports = router;