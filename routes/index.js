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
	var next_topnew_products = [];
	productRepo.loadTopBuy(10)
		.then(topbuy_products => {
			var count = 0;

			var i = 0;
			while (i < 5) {
				next_topbuy_products.push(topbuy_products.pop());
				i += 1;
			}
			next_topbuy_products.reverse();
			console.log("Loaded top 10 buy data completed.");
			// res.render('index', 
			// { 
			// 	title: 'Trilpe Shop',
			// 	topbuy_products: topbuy_products,
			// 	next_topbuy_products: next_topbuy_product
			// });
			productRepo.loadTopViews(10)
				.then(topview_products => {
				var count = 0;

				var i = 0;
				while (i < 5) {
					next_topview_products.push(topview_products.pop());
					i += 1;
				}
				next_topview_products.reverse();
				console.log("Loaded top 10 view data completed.");
				productRepo.loadTopNews(10)
					.then(topnew_products => {
					var count = 0;

					var i = 0;
					while (i < 5) {
						next_topnew_products.push(topnew_products.pop());
						i += 1;
					}
					next_topview_products.reverse();
					res.render('index', 
					{ 
						title: 'Trilpe Shop',
						topbuy_products: topbuy_products,
						next_topbuy_products: next_topbuy_products,
						topview_products: topview_products,
						next_topview_products: next_topview_products,
						topnew_products: topview_products,
						next_topnew_products: next_topnew_products
					});
					console.log("Loaded top 10 view data completed.");

					})
					.catch(err => {
						console.log('Error: ' + err);
						return res.render('index', 
						{ 
							title: 'Trilpe Shop',
							topbuy_products: null,
							next_topbuy_products: null,
							topview_products: null,
							next_topview_products: null,
							topnew_products: null,
							next_topnew_products: null
						});
				});	

				})
				.catch(err => {
					console.log('Error: ' + err);
					return res.render('index', 
					{ 
						title: 'Trilpe Shop',
						topbuy_products: null,
						next_topbuy_products: null,
						topview_products: null,
						next_topview_products: null
					});
				});	

		})
		.catch(err => {
			console.log('Error: ' + err);
			return res.render('index', 
			{ 
				title: 'Trilpe Shop',
				topbuy_products: null,
				next_topbuy_products: null,
				topview_products: null,
				next_topview_products: null
			});
		});


});

router.get('/product/:id', function (req, res, next) {
	productRepo.loadById(req.params.id)
		.then(product => {
			req.session.product = product;
			console.log("Loaded product by id.");
			return res.redirect('/product');
		})
		.catch(err => {
			req.session.product = null;
			console.log('Error: ' + err);
			res.redirect('/product');
		});	
});

router.get('/product', function (req, res, next) {
	console.log(req.session.cartList);
	if (!req.session.product) {
		return res.render('product', {product: null});
	}
	res.render('product', {
		product: req.session.product
	});
});

router.get('/cart', function (req, res, next) {
	res.render('cart', {
		
	});
});

router.get('/header', function (req,res,next) {
  res.render('Header');
});

router.post('/add-product', function(req, res, next) { 
	// var listID = req.session.cartList;
	if (!req.session.cartList) {
		req.session.cartList = [];
	}
	req.session.cartList.push(req.body.product_id)
	// req.session.cartList = listID;
	res.redirect('/product')
});

router.get('/add-product', function(req, res, next) { 
	console.log("----------------");
	console.log("OK");
});


module.exports = router;
