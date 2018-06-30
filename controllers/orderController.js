var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');

router.get('/detailId=:id', function(req, res, next) {
	var id = req.params.id; 
	console.log('---------------------/detailId loadProductsWithOrderID id' + id);
	productRepo.loadProductsWithOrderID(id)
		.then((orders) => {
			console.log('---------------------/detailId loadProductsWithOrderID OK');
			var totalprice = 0;
			var ordersID = 0;
			if (orders[0]) {
				ordersID = orders[0].orderid;
			}
			console.log('-------------------- ' + ordersID);
			for (var order of orders) {
				
				totalprice += order.totalprice;
			}
				// console.log('====================== '+orders[0].id);	
			return res.render('orderdetail', {
				ordersID: ordersID,
				orders: orders,
				totalprice: totalprice,
				userdisplayname: req.session.userdisplayname,
				user: req.session.user
			});
		})		
		.catch(err => {

			console.log('---------------------/detailId loadProductsWithOrderID failed');
			res.redirect('/');
		});
});

// router.post('/payment/:id', function(req, res, next) {
// 	req.session.cartList = []; 
// 	return res.render('cart');
// });

module.exports = router;