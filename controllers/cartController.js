var express = require('express');
var router = express.Router();
var cartRepo = require('../repos/cartRepo.js');
var productRepo = require('../repos/productRepo.js');
var orderRepo = require('../repos/orderRepo.js');
var fs = require('fs');
var dateFormater = require('dateformat');

router.get('/', function (req, res, next) {
	cartRepo.loadAllProducts(req.session.user.username)
		.then(products => {
			var totalprice = 0;
			var count = 0;
			for (var product of products) {
				totalprice += product.price*product.cartquantity;
				// console.log('-------------' + product.cartprice);
				count += product.cartquantity;
			}
			return res.render('cart', {
				products: products,
				totalprice: totalprice,
				count: count,
				user: req.session.user,
				userdisplayname: req.session.userdisplayname
			});
		})
		.catch(err => {

			console.log('Error: ' + err);
			return 	res.render('cart', {
					products: null,
					user: req.session.user,
					userdisplayname: req.session.userdisplayname
			});
		});

});

router.get('/remove/:id', function (req, res, next) {
	if (!req.session.isLogged) {
		return res.redirect('/');
	} else {
		var id = req.params.id;
		cartRepo.removeProducts(req.session.user.username, id)
			.then(value => {
				console.log('value: ' + value);
				return res.redirect('/cart');
			})
			.catch(error => {
				return res.redirect('/');
			});
	}
	
});

router.post('/incWithId=:id&quantity=:quantity', function (req, res) {
	var id = req.params.id;
	var quantity = req.params.quantity;
	productRepo.loadById(id)
		.then(products => {
			if (products[0].quantity > +quantity) {
				cartRepo.updateQuantity(req.session.user.username, id, +quantity + 1)
					.then(value => {
						// return res.redirect()
						return res.redirect('/cart');
					})
					.catch(error => {
						return res.redirect('/cart');
						// return res.redirect('/cart');
					});
				} else {
					return res.redirect('/cart');
				}	
		})
		.catch(error => {
			return res.redirect('/cart');
		});
	
});

router.post('/decWithId=:id&quantity=:quantity', function (req, res) {
	var id = req.params.id;
	var quantity = req.params.quantity;
	if (quantity <= 1) {
		cartRepo.removeProducts(req.session.user.username, id)
			.then(value => {
				return res.redirect('/cart');
			})
			.catch(error => {
				return res.redirect('/cart');
			});
	} else {
		cartRepo.updateQuantity(req.session.user.username, id, +quantity - 1)
			.then(value => {
				// return res.redirect()
				return res.redirect('/cart');
			})
			.catch(error => {
				return res.redirect('/cart');
				// return res.redirect('/cart');
			});
	}

});

router.get('/payment', function(req, res, next) { 
	cartRepo.loadTotalMoney(req.session.user.username)
		.then(totalmoney => {
			return res.render('payment',{
				totalmoney: totalmoney[0].totalmoney,
				user: req.session.user,
				userdisplayname: req.session.userdisplayname
			});
		})
		.catch(error => {
			return res.redirect('/cart');
		});

});

router.post('/payment', function(req, res) { 
	var receivername = req.body.receivername;
	var receiverphone = req.body.receiverphone;
	var receiveraddress = req.body.receiveraddress;
	if (receivername === '' || receivername === null ||
		receiverphone === '' || receiverphone === null ||
		receiveraddress === '' || receiveraddress === null) {
		cartRepo.loadTotalMoney(req.session.user.username)
			.then(totalmoney => {
				return res.render('payment',{
					totalmoney: totalmoney[0].totalmoney,
					user: req.session.user,
					isFailed: true,
					userdisplayname: req.session.userdisplayname
				});
			})
			.catch(error => {
				return res.redirect('/cart');
			});
	} else {
		var date = Date();
		var username = req.session.user.username;
		var curDate = dateFormater(date, 'yyyy-mm-dd h:MM:ss');
		var order = {
			status: 			'Chưa giao',
			date: 				curDate,
			user: 				username,
			receivername: 		req.body.receivername,
			receiverphone: 		req.body.receiverphone,
			receiveraddress: 	req.body.receiveraddress
		}

		orderRepo.insertOrder(order)
			.then(value => {
				var promise1 = orderRepo.loadLastOrderID(username);
				var promise2 = cartRepo.loadAllProducts(username);
				Promise.all([promise1, promise2])
					.then(([id, prods]) => {
						console.log('************** loadLastOrderID & loadAllProducts OK');
						var id = id[0].id;
						for (var prod of prods) {
							console.log('=================' + prod.id);
							console.log('=================' + id);
							var productsinorder = {
								order: id,
								product: prod.id,
								quantity: prod.cartquantity
							}
							var promise3 = orderRepo.insertProductToOrder(productsinorder);
							var promise4 = productRepo.updateQuantityAndBuy(prod.id, -(+prod.cartquantity));
							console.log(`---------------+++++++++ ${-(+prod.cartquantity)}`);
							Promise.all([promise3, promise4])
								.then(([value1, value2]) => {
									console.log('************** insertProductToOrder OK');
								})
								.catch(error => {
									console.log('************** insertProductToOrder failed');
									return res.redirect('/cart');
								});
						}
						cartRepo.removeCart(username)
							.then(value => {

								console.log('************** removeCart OK');
								req.session.isPayment = true;
								return res.redirect('/user/orders');
							})
							.catch(error => {
								console.log('************** removeCart failed');
								return res.redirect('/cart');
							})
						
					})
					.catch(error => {
						console.log('************** loadLastOrderID & loadAllProducts failed');
						return res.redirect('/cart');
					});
			})
			.catch(error => {
				return res.redirect('/cart');
			});
	}

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

});

module.exports = router;