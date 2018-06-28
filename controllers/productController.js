var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
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
	console.log("-------------------------------------");
	var cartList = req.session.cartList;
	var id = req.params.id;
	if (!cartList) {
		req.session.cartList = [];
		req.session.cartList.push({id: id, count: 1})
	} else {
		var i = 0;
		var flag = false;
		console.log(id);
		while (i < cartList.length) {
			if (cartList[i].id == id) {
				req.session.cartList[i].count += 1;
				flag = true;
				break;
			}
			i += 1;
		}

		if (!flag) {
			req.session.cartList.push({id: id, count: 1})
		}
	}

	return res.redirect(`/product/${id}`);
});

router.post('/buy/:id', function(req, res, next) { 
	var cartList = req.session.cartList;
	var id = req.params.id;
	if (!cartList) {
		req.session.cartList = [];
		req.session.cartList.push({id: id, count: 1})
		return res.redirect('/cart');
	} else {
		var i = 0;
		var flag = false;
		console.log(id);
		while (i < cartList.length) {
			if (cartList[i].id == id) {
				req.session.cartList[i].count += 1;
				flag = true;
				break;
			}
			i += 1;
		}

		if (!flag) {
			req.session.cartList.push({id: id, count: 1})
		}
	}

	return res.redirect('/cart');
});

module.exports = router;