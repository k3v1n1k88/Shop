var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var orderRepo = require('../repos/orderRepo.js');
var fs = require('fs');
var Order = require('../models/Order.js');

router.get('/', function(req, res, next) { 
	if (req.session.isLogged) {
		// if (req.session.user.username == 'admin') {
		// 	return res.redirect('/admin');
		// }
		return res.render('user', {
			user: req.session.user,
			isDetailMode: true
		});
	}
	res.redirect('/');
	// return res.render('user');
});

router.get('/:type', function(req, res, next) {
	if (req.session.isLogged) {
		var type = req.params.type;
		if (type === 'detail') {
			return res.render('user', {
				user: req.session.user,
				isDetailMode: true
			});
		} else {
			if (req.session.user.username === 'admin') {
				return res.render('user', {
						user: req.session.user,
						isDetailMode: false
					});
			}
			var promise1 = orderRepo.loadAllOrdersWithUsername(req.session.user.username);
			var promise2 = orderRepo.loadAllProducts();
			Promise.all([promise1, promise2])
				.then(([ords, prods]) => {
					// console.log(ords);
					// console.log(prods);
					// 
									
					var orders = [];
					// console.log('-------------------------------------------');
					for (var order of ords) {
						
						var products = [];
						var totalprice = 0;
						for (var prod of prods) {
							if (prod.order == order.id) {
								var productprice = prod.price*prod.quantity;
								products.push({
									product: prod,
									totalprice: productprice
								});
								totalprice += productprice;
							}
						}
						orders.push({
							order: order,
							products: products,
							totalprice: totalprice
						});
						console.log('++' + orders[0].order);
					}
					console.log('++' + orders[0].order.date);
					return res.render('user', {
						user: req.session.user,
						orders: orders,
						isDetailMode: false
					});
				})		
				.catch(err => {

					console.log('***************************8 Error: ' + err);
					res.redirect('/');
				});
		}
	}
	// res.redirect('/');
	// return res.render('user');
});

// router.get('/login', function(req, res, next) { 
// 	if (req.session.isLogged) {
// 		res.redirect('/');
// 	}
// 	res.redirect('/');
// });

module.exports = router;