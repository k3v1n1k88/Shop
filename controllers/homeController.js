var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');

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
						title: 'TripleV Shop',
						topbuy_products: topbuy_products,
						next_topbuy_products: next_topbuy_products,
						topview_products: topview_products,
						next_topview_products: next_topview_products,
						topnew_products: topview_products,
						next_topnew_products: next_topnew_products,
						userdisplayname: req.session.userdisplayname
					});
					console.log("Loaded top 10 view data completed.");

					})
					.catch(err => {
						console.log('Error: ' + err);
						return res.render('index', 
						{ 
							title: 'TripleV Shop',
							topbuy_products: null,
							next_topbuy_products: null,
							topview_products: null,
							next_topview_products: null,
							topnew_products: null,
							next_topnew_products: null,
							userdisplayname: req.session.userdisplayname
						});
				});	

				})
				.catch(err => {
					console.log('Error: ' + err);
					return res.render('index', 
					{ 
						title: 'TripleV Shop',
						topbuy_products: null,
						next_topbuy_products: null,
						topview_products: null,
						next_topview_products: null,
						userdisplayname: req.session.userdisplayname
					});
				});	

		})
		.catch(err => {
			console.log('Error: ' + err);
			return res.render('index', 
			{ 
				title: 'TripleV Shop',
				topbuy_products: null,
				next_topbuy_products: null,
				topview_products: null,
				next_topview_products: null,
				userdisplayname: req.session.userdisplayname
			});
		});


});

module.exports = router;