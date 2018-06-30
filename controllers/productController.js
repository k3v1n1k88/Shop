var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var cartRepo = require('../repos/cartRepo.js');
var fs = require('fs');

router.get('/:id', function (req, res, next) {
	productRepo.loadUpdateView(req.params.id)
		.then(value=>{
			console.log(value);
		})
		.catch(err=>{
			console.log('Error: '+err);
		});
	var p1 = productRepo.loadSameTypeById(req.params.id);
	var p2 = productRepo.loadSameBranchByID(req.params.id);
	var p3 = productRepo.loadById(req.params.id);
	Promise.all([p1, p2, p3])
		.then(([sametype,samebranch,product])=> {
			//console.log(p1);
			var lenSameType = sametype.length;
			var lenSameBranch = samebranch.length;
			console.log("len same type"+lenSameType);
			console.log("len same branch"+lenSameBranch);

			var i = 0;

			var listSameType13 = [];
			var listSameType46 = [];
			var listSameBranch13 = [];
			var listSameBranch46 = [];

			while(i<3&&i<lenSameType){
				listSameType13.push(sametype[i]);
				i++;
			}
			lenSameType-=3;
			i = 0;
			while(i<3&&i<lenSameType){
				listSameType46.push(sametype[i]);
				i++;
			}
			i=0;
			lenSameBranch-=3;
			while(i<3&&i<lenSameBranch){
				listSameBranch13.push(samebranch[i]);
				i++;
			}
			while(i<3&&i<lenSameBranch){
				listSameBranch46.push(samebranch[i]);
				i++;
			}
			res.render('product', {
				product: product,
				listSameType13: listSameType13,
				listSameType46: listSameType46,
				listSameBranch13: listSameBranch13,
				listSameBranch46: listSameBranch46,
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