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
			res.render('product', {
				product: product
			});
			console.log("Loaded product by id.");
			// return res.redirect('/product');
		})
		.catch(err => {
			res.render('product', {
				product: null
			});
			console.log('Error: ' + err);
			// res.redirect('/product');
		});	
});

// router.get('/product', function (req, res, next) {
// 	// console.log(req.session.cartList);
// 	if (!req.session.product) {
// 		return res.render('product', {product: null});
// 	}
// 	res.render('product', {
// 		product: req.session.product
// 	});
// });

router.get('/cart', function (req, res, next) {
	// console.log("---------------------");
	if (!req.session.cartList) {
		return 	res.render('cart', {
			products: null
		});
	}
	var idList = [];
	for (i of req.session.cartList) {
		idList.push(i.id);
	}
	productRepo.loadByIds(idList)
		.then(products => {
			console.log("Loaded product by ids.");
			var prods = [];
			var totalPriceAllProd = 0;
			for (i of products) {
				for (j of req.session.cartList) {
					if (i.id == j.id) {
						var totalPrice = i.price * j.count;
						totalPriceAllProd += totalPrice;
						prods.push({products: i, count: j.count, totalPrice: totalPrice});
						break;
					}
				}
			}
			console.log(totalPriceAllProd);
			res.render('cart', {
				products: prods,
				totalPriceAllProd: totalPriceAllProd
			});
		})
		.catch(err => {

			console.log('Error: ' + err);
			return 	res.render('cart', {
					products: null
			});
		});	
});

router.get('/cart/remove/:id', function (req, res, next) {
	var id = req.params.id;
	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			req.session.cartList.splice(j, 1);
			console.log(i);
			break;
		}
		j += 1;
	}
	console.log("++++++++++++++++");
	console.log(req.session.cartList);
	res.redirect('/cart');
});

router.get('/cart/inc/:id', function (req, res, next) {
	var id = req.params.id;
	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			i.count += 1;
			break;
		}
		j += 1;
	}
	res.redirect('/cart');
});

router.get('/cart/dec/:id', function (req, res, next) {
	var id = req.params.id;

	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			if (i.count == 1) {
				return res.redirect(`/cart/remove/${id}`);
			}
			i.count -= 1;
			break;
		}
		j += 1;
	}
	res.redirect('/cart');
});


// router.get('/header', function (req,res,next) {
//   res.render('Header');
// });

router.get('/add-product/:id', function(req, res, next) { 
	var cartList = req.session.cartList;
	var id = req.params.id;
	if (!cartList) {
		req.session.cartList = [];
		req.session.cartList.push({id: id, count: 1})
		return res.redirect(`/product/${id}`);
	}
	// console.log("++++++++++++++++++++");
	// console.log(req.session.cartList);
	var i = 0;
	var flag = false;
	console.log(id);
	while (i < cartList.length) {
		if (cartList[i].id == id) {
			req.session.cartList[i].count += 1;
			flag = true;
			break;
		}
		i += 1;
	}

	if (!flag) {
		req.session.cartList.push({id: id, count: 1})
	}
	// res.redirect('/product')
	return res.redirect(`/product/${id}`);
});

router.get('/buy-product/:id', function(req, res, next) { 
	var cartList = req.session.cartList;
	var id = req.params.id;
	if (!cartList) {
		req.session.cartList = [];
		req.session.cartList.push({id: id, count: 1})
		return res.redirect('/cart');
	}
	// console.log("++++++++++++++++++++");
	// console.log(req.session.cartList);
	var i = 0;
	var flag = false;
	console.log(id);
	while (i < cartList.length) {
		if (cartList[i].id == id) {
			req.session.cartList[i].count += 1;
			flag = true;
			break;
		}
		i += 1;
	}

	if (!flag) {
		req.session.cartList.push({id: id, count: 1})
	}
	// res.redirect('/product')
	return res.redirect('/cart');
});

// router.get('/add-product', function(req, res, next) { 
// 	console.log("----------------");
// 	console.log("OK");
// });


module.exports = router;
