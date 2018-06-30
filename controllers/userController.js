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
			isDetailMode: true,
			userdisplayname: req.session.userdisplayname
		});
	}
	res.redirect('/');
	// return res.render('user');
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	req.session.userdisplayname = null; 
	req.session.isLogged = false;
	res.redirect('/');
	// return res.render('user');
});

router.get('/:type', function(req, res, next) {
	if (req.session.isLogged) {
		var type = req.params.type;
		if (type === 'detail') {
			return res.render('user', {
				user: req.session.user,
				isDetailMode: true,
				userdisplayname: req.session.userdisplayname
			});
		} if (type === 'orders') {
			if (req.session.user.username === 'admin') {
				return res.render('user', {
						user: req.session.user,
						isDetailMode: false,
						userdisplayname: req.session.userdisplayname
					});
			}
			var promise1 = orderRepo.loadAllOrdersWithUsername(req.session.user.username);
			var promise2 = orderRepo.loadAllProducts();
			Promise.all([promise1, promise2])
				.then(([ords, prods]) => {
					// console.log(ords);
					// console.log(prods);
					// 
					// console.log('------------------------------------------- ords ' + ords);
					if (ords[0] === undefined) {
						// console.log('------------------------------------------- ords ' + ords);
						return res.render('user', {
							user: req.session.user,
							orders: null,
							isDetailMode: false,
							userdisplayname: req.session.userdisplayname
						});
					}
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
					var isPayment = req.session.isPayment;
					req.session.isPayment = false;
					return res.render('user', {
						user: req.session.user,
						orders: orders,
						isDetailMode: false,
						isPayment: isPayment,
						userdisplayname: req.session.userdisplayname
					});

				})		
				.catch(err => {

					console.log('***************************8 Error: ' + err);
					res.redirect('/');
				});
		} else {
			return res.redirect('/user');
		}
	}
	// res.redirect('/');
	// return res.render('user');
});

router.post('/changeDisplayname', function(req, res) {
	console.log('--------------------- changeDisplayname ' + newdisplayname);
	var newdisplayname = req.body.new_displayname;
	req.session.user.displayname = newdisplayname;
	if (newdisplayname === '') {
        req.session.userdisplayname = req.session.user.username; 
    } else {
        req.session.userdisplayname = req.session.user.displayname;
    }
    console.log('--------------------- changeDisplayname ' + newdisplayname);
	userRepo.updateUser(req.session.user)
		.then(value => {
			return res.redirect('/user');
		})
		.catch(error => {
			return res.redirect('/user');
		});
});

router.post('/changePassword', function(req, res) {
	var oldpw = req.body.old_password;
	var newpw = req.body.new_password;
	var retypepw = req.body.retype_password;
	if (newpw !== retypepw) {
		return res.redirect('/user');
	} else {
		if (req.session.user.password ===  SHA256(oldpw).toString()) {
			req.session.user.password = SHA256(newpw).toString();
			userRepo.updateUser(req.session.user)
				.then(value => {
					return res.redirect('/user');
				})
				.catch(error => {
					return res.redirect('/user');
				});
		} else {
			return res.redirect('/user');
		}
	}
	
});

router.post('/changeEmail', function(req, res) {
	var newemail = req.body.new_email;
	console.log('--------------- changeemail ' + newemail);
	req.session.user.email = newemail;

	userRepo.updateUser(req.session.user)
		.then(value => {
			return res.redirect('/user');
		})
		.catch(error => {
			return res.redirect('/user');
		});
});

router.post('/changePhone', function(req, res) {
	var newphone = req.body.new_phone;
	console.log('------------------- phone ' + newphone);
	req.session.user.phone = +newphone;

	userRepo.updateUser(req.session.user)
		.then(value => {
			return res.redirect('/user');
		})
		.catch(error => {
			return res.redirect('/user');
		});
});

module.exports = router;