var express = require('express');
var router = express.Router();
var cartRepo = require('../repos/cartRepo.js');
var productRepo = require('../repos/productRepo.js');
var orderRepo = require('../repos/orderRepo.js');
var fs = require('fs');
var dateFormater = require('dateformat');

router.get('/', function (req, res, next) {
	console.log('----------------- username ' + req.session.user.username);
	if (!req.session.isLogged) {
		return res.redirect('/');
	} else {
		console.log('+++++++++++++++++++++++++++++++++++++++vu1');
		cartRepo.loadAllProducts(req.session.user.username)
			.then(products => {
				console.log('+++++++++++++++++++++++++++++++++++++++vu2');
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
					count: count
				});
			})
			.catch(err => {

				console.log('Error: ' + err);
				return 	res.render('cart', {
						products: null
				});
			});

		// if (!req.session.cartList) {
		// 	return 	res.render('cart', {
		// 		products: null
		// 	});
		// }
		// var idList = [];
		// for (i of req.session.cartList) {
		// 	idList.push(i.id);
		// }
		// productRepo.loadByIds(idList)
		// 	.then(products => {
		// 		console.log("Loaded product by ids.");
		// 		var prods = [];
		// 		var totalPriceAllProd = 0;
		// 		for (i of products) {
		// 			for (j of req.session.cartList) {
		// 				if (i.id == j.id) {
		// 					var totalPrice = i.price * j.count;
		// 					totalPriceAllProd += totalPrice;
		// 					prods.push({products: i, count: j.count, totalPrice: totalPrice});
		// 					break;
		// 				}
		// 			}
		// 		}
		// 		console.log(totalPriceAllProd);
		// 		res.render('cart', {
		// 			products: prods,
		// 			totalPriceAllProd: totalPriceAllProd
		// 		});
		// 	})
		// 	.catch(err => {

		// 		console.log('Error: ' + err);
		// 		return 	res.render('cart', {
		// 				products: null
		// 		});
		// 	});	
	}
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
	

	
	// console.log(id);
	// var j = 0;
	// for (i of req.session.cartList) {
	// 	if (i.id == id) {
	// 		req.session.cartList.splice(j, 1);
	// 		console.log(i);
	// 		break;
	// 	}
	// 	j += 1;
	// }
	// console.log("++++++++++++++++");
	// console.log(req.session.cartList);
	// res.redirect('/cart');
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
				return res.render('/cart');
			})
			.catch(error => {
				return res.render('/cart');
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
				user: req.session.user
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
		return res.redirect('/cart/payment');
	} else {
		var date = Date();
		var username = req.session.user.username;
		var curDate = dateFormater(date, 'yyyy-mm-dd');
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
							var promise4 = productRepo.updateQuantity(prod.id, -(+prod.cartquantity));
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
								return res.redirect('/cart');
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


module.exports = router;