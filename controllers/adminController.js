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
			req.session.manufacturers = manufacturers;
			req.session.types = types;
			// console.log(manufacturers);
			return res.render('admin', {
				products: products,
				orders: orders,
				manufacturers: manufacturers,
				types: types,
				user: req.session.user,
				userdisplayname: req.session.userdisplayname,
				isDetailMode: true
			});
		});
	} else {
		return res.redirect('/login');
	}
});

router.get('/orders', function(req, res, next) {
	if (req.session.user.username !== 'admin') {
		return res.redirect('/admin');
	}
	var promise1 = orderRepo.loadAllOrdersWithoutUsername();
	var promise2 = orderRepo.loadAllProducts();
	Promise.all([promise1, promise2])
		.then(([ords, prods]) => {
			// console.log(ords);
			// console.log(prods);
			// 
			console.log('------------------------------------------- ++++++++++++++++++= ' + ords);
			if (ords[0] === undefined) {
				// console.log('------------------------------------------- ords ' + ords);
				return res.render('admin', {
					user: req.session.user,
					orders: null,
					isDetailMode: true,
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
			return res.render('admin', {
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
});

router.post('/updateid=:id', function(req, res) {
	// console.log('---------------------------------- 1' + req.session.manufacturers);
	var id = req.params.id;
	var type = req.body.type;
	type = req.session.types[+type[0]].type;
	// console.log('---------------------------------- 2' + manufacturer);
	var manufacturer = req.body.manufacturer;
	// console.log('---------------------------------- 3' + manufacturer[0]);
	var manufacturer2 = req.session.manufacturers[+manufacturer[0]].manufacturer;
// console.log('---------------------------------- 4' + manufacturer2);
	var quantity = +req.body.quantity;
	var price = +req.body.price;
	var name = req.body.name;
	var prod = {
		name: name,
		id: id,
		type: type,
		manufacturer: manufacturer2,
		quantity: quantity,
		price: price
	}

	productRepo.updateProduct(prod)
		.then(value => {
			console.log('---------------------------------- OKKKK');
			return res.redirect('/admin');
		})
		.catch(error => {
			console.log('---------------------------------- failed');
			return res.redirect('/admin');
		});
});

router.post('/orders/updateid=:id', function(req, res) {
	
	var id = req.params.id;
	console.log('---------------------------------- id ' + id);
	var status = req.body.status;
	var statusarr = ['Chưa giao', 'Đang giao', 'Đã giao'];
	status = statusarr[+status[0]];
		console.log('---------------------------------- status ' + status);
	orderRepo.updateStatus(+id, status)
		.then(value => {
			return res.redirect('/admin/orders');
		})
		.catch(error => {
			return res.redirect('/admin/orders');
		});
});


module.exports = router;