var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');

router.get('/', function (req, res, next) {
	// console.log("---------------------");
	if (!req.session.cartList) {
		return 	res.render('cart', {
			products: null
		});
	}
	var idList = [];
	for (i of req.session.cartList) {
		idList.push(i.id);
	}
	productRepo.loadByIds(idList)
		.then(products => {
			console.log("Loaded product by ids.");
			var prods = [];
			var totalPriceAllProd = 0;
			for (i of products) {
				for (j of req.session.cartList) {
					if (i.id == j.id) {
						var totalPrice = i.price * j.count;
						totalPriceAllProd += totalPrice;
						prods.push({products: i, count: j.count, totalPrice: totalPrice});
						break;
					}
				}
			}
			console.log(totalPriceAllProd);
			res.render('cart', {
				products: prods,
				totalPriceAllProd: totalPriceAllProd
			});
		})
		.catch(err => {

			console.log('Error: ' + err);
			return 	res.render('cart', {
					products: null
			});
		});	
});

router.get('/remove/:id', function (req, res, next) {
	var id = req.params.id;
	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			req.session.cartList.splice(j, 1);
			console.log(i);
			break;
		}
		j += 1;
	}
	console.log("++++++++++++++++");
	console.log(req.session.cartList);
	res.redirect('/cart');
});

router.post('/inc/:id', function (req, res) {
	console.log("**********************************");
	var id = req.params.id;
	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			i.count += 1;
			break;
		}
		j += 1;
	}
	res.redirect('/cart');
});

router.post('/dec/:id', function (req, res) {
	var id = req.params.id;

	console.log(id);
	var j = 0;
	for (i of req.session.cartList) {
		if (i.id == id) {
			if (i.count == 1) {
				return res.redirect(`/cart/remove/${id}`);
			}
			i.count -= 1;
			break;
		}
		j += 1;
	}
	res.redirect('/cart');
});


module.exports = router;