var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var orderRepo = require('../repos/orderRepo.js');
var fs = require('fs');
var Order = require('../models/Order.js');
var SHA256 = require('crypto-js/sha256');

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
								products.push(prod);
								totalprice += prod.price;
							}
						}
						orders.push({
							order: order,
							products: products,
							totalprice: totalprice
						});
						console.log('++' + orders[0].order);
					}
					console.log('++' + orders);
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

router.get('/payment/:id', function(req, res, next) { 
	return res.render('payment');
});

router.post('/login', function(req, res) {
	var user = {
		username: req.body.username,
		password: SHA256(req.body.password).toString()
	}
	console.log(SHA256('admin').toString());
	userRepo.loadUser(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];
            console.log('**************************');
            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect('/');
        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.redirect('/');
        }
    });
});

router.get('/login', function(req, res, next) { 
	if (req.session.isLogged) {
		res.redirect('/');
	}
	res.redirect('/');
});

module.exports = router;