var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var cartRepo = require('../repos/cartRepo.js');
var fs = require('fs');

router.get('/:id', function (req, res, next) {
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

router.post('/add/:id', function(req, res) {
	var id = req.params.id;
	cartRepo.loadProduct(req.session.user.username, id)
		.then(carts => {
			console.log("---------------------------- loadCart OK");
			var cart = {
					user: req.session.user.username,
					product: id,
					quantity: 1
			};
			if (carts[0]) {
				cart.quantity = carts[0].quantity + 1;
				
				cartRepo.updateCart(cart)
					.then(value => {
						console.log("---------------------------- updateCart OK");
						return res.redirect(`/product/${id}`);
					})
					.catch(error => {
						console.log("---------------------------- updateCart failed");
						return res.redirect(`/product/${id}`);
					})
			} else {
				cartRepo.insertCart(cart)
					.then(value => {
						console.log("---------------------------- insertCart OK");
						return res.redirect(`/product/${id}`);
					})
					.catch(error => {
						console.log("---------------------------- insertCart failed");
						return res.redirect(`/product/${id}`);
					})
			}
			
		})
		.catch(error => {
			console.log("---------------------------- loadCart failed");
			return res.redirect(`/product/${id}`);
		})
	// console.log("-------------------------------------");
	// var cartList = req.session.cartList;
	// var id = req.params.id;
	// if (!cartList) {
	// 	req.session.cartList = [];
	// 	req.session.cartList.push({id: id, count: 1})
	// } else {
	// 	var i = 0;
	// 	var flag = false;
	// 	console.log(id);
	// 	while (i < cartList.length) {
	// 		if (cartList[i].id == id) {
	// 			req.session.cartList[i].count += 1;
	// 			flag = true;
	// 			break;
	// 		}
	// 		i += 1;
	// 	}

	// 	if (!flag) {
	// 		req.session.cartList.push({id: id, count: 1})
	// 	}
	// }

	// return res.redirect(`/product/${id}`);
});

router.post('/buy/:id', function(req, res) { 
	var id = req.params.id;
	cartRepo.loadProduct(req.session.user.username, id)
		.then(carts => {
			console.log("---------------------------- loadCart OK");
			var cart = {
					user: req.session.user.username,
					product: id,
					quantity: 1
			};
			console.log(`----------------- cart ${carts[0]}`);
			if (carts[0]) {
				cart.quantity = carts[0].quantity + 1;
				
				cartRepo.updateCart(cart)
					.then(value => {
						console.log("---------------------------- updateCart OK");
						return res.redirect(`/cart`);
					})
					.catch(error => {
						console.log("---------------------------- updateCart failed");
						return res.redirect(`/product/${id}`);
					})
			} else {
				cartRepo.insertCart(cart)
					.then(value => {
						console.log("---------------------------- insertCart OK");
						return res.redirect(`/cart`);
					})
					.catch(error => {
						console.log("---------------------------- insertCart failed");
						return res.redirect(`/product/${id}`);
					})
			}
			
		})
		.catch(error => {
			console.log("---------------------------- loadCart failed");
			return res.redirect(`/product/${id}`);
		})
	// var cartList = req.session.cartList;
	// var id = req.params.id;
	// if (!cartList) {
	// 	req.session.cartList = [];
	// 	req.session.cartList.push({id: id, count: 1})
	// 	return res.redirect('/cart');
	// } else {
	// 	var i = 0;
	// 	var flag = false;
	// 	console.log(id);
	// 	while (i < cartList.length) {
	// 		if (cartList[i].id == id) {
	// 			req.session.cartList[i].count += 1;
	// 			flag = true;
	// 			break;
	// 		}
	// 		i += 1;
	// 	}

	// 	if (!flag) {
	// 		req.session.cartList.push({id: id, count: 1})
	// 	}
	// }

	// return res.redirect('/cart');
});

module.exports = router;