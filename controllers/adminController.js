var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var orderRepo = require('../repos/orderRepo.js');
var fs = require('fs');

router.get('/', function(req, res, next) {
	console.log('----------------- username ' + req.session.user.usrname);
	if (req.session.user.username === 'admin') {
		var p1 = productRepo.loadAllProducts();	
		var p2 = orderRepo.loadAllOrders();
		var p3 = productRepo.loadAllManufacturers();	
		var p4 = productRepo.loadAllTypes();
		Promise.all([p1, p2, p3, p4]).then(([products, orders, manufacturers, types]) => {
			// console.log(manufacturers);
			return res.render('admin', {
				products: products,
				orders: orders,
				manufacturers: manufacturers,
				types: types
			});
		});
	} else {
		return res.redirect('/login');
	}
});

module.exports = router;