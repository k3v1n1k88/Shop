var express = require('express');
var router = express.Router();
var productRepo = require('../func/productRepo.js');
var fs = require('fs');
var Product = require('../models/product');

//var Cart = require('../models/cart'); <- model cart
//
// var products = [];
// var next_product = [];
// productRepo.loadTop10Views()
//     .then(rows => {
//     	var count = 0;
//     	for (i of rows) {
//     		var prod = new Product(rows);
//     		products.push(prod);
//     	}
//     	products = rows;
// // console.log(products);
// 		var i = 0;
// 		while (i < 5) {
// 			next_product.push(products.pop());
// 			i += 1;
// 		}
// 		next_product.reverse();

//     	console.log("Loading top 10 view data completed.");

//     })
//     .catch(err => {
//         console.log('Error: ' + err);
//     });

router.get('/', function (req, res, next) {
	var next_topbuy_products = [];
	var next_topview_products = [];
	productRepo.loadTop10Buy()
		.then(topbuy_products => {
			var count = 0;

			var i = 0;
			while (i < 5) {
				next_topbuy_products.push(topbuy_products.pop());
				i += 1;
			}
			next_topbuy_products.reverse();
			console.log("Loading top 10 buy data completed.");
			// res.render('index', 
			// { 
			// 	title: 'Trilpe Shop',
			// 	topbuy_products: topbuy_products,
			// 	next_topbuy_products: next_topbuy_product
			// });
			productRepo.loadTop10Views()
				.then(topview_products => {
				var count = 0;

				var i = 0;
				while (i < 5) {
					next_topview_products.push(topview_products.pop());
					i += 1;
				}
				next_topview_products.reverse();
				res.render('index', 
				{ 
					title: 'Trilpe Shop',
					topbuy_products: topbuy_products,
					next_topbuy_products: next_topbuy_products,
					topview_products: topview_products,
					next_topview_products: next_topview_products
				}
				);
				console.log("Loading top 10 view data completed.");

				})
				.catch(err => {
					console.log('Error: ' + err);
				});	

		})
		.catch(err => {
			console.log('Error: ' + err);
		});


});

router.get('/types', function (req, res, next) {
	res.render('productshow', {});
});

router.get('/header', function (req,res,next) {
  res.render('Header');
});

module.exports = router;
