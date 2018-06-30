
var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var fs = require('fs');

router.get('/', function(req, res, next) { 
	return res.redirect('/products/page=1');
});

router.get('/page=:id', function(req, res, next) { 
	var id = req.params.id;
	if (id <= 0) {
		return res.render('products');
	}
	var start = 9 * (id - 1);
	var p1 = productRepo.loadAllProducts();	
	var p3 = productRepo.loadAllManufacturers();	
	var p4 = productRepo.loadAllTypes();
	Promise.all([p1, p3, p4])
		.then(([prods,manufactorers,types])=> {
			console.log("Loaded all product.");
			//console.log(prods);
			var list13 = [];
			var list46 = [];
			var list79 = [];
			var count = [];
			var i = start;
			var max = i + 3;
			while (i < max) {
				list13.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list46.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list79.push(prods[i]);
				i += 1;
			}
			var len = prods.length;
			i = 1;
			while (len > 0) {
				count.push(i);
				len -= 9;
				console.log(len);
				i += 1;
			}
			var quantity = [];
			quantity.push(prods.length);
			console.log(types);
			return res.render('products', {
				products13: list13,
				products46: list46,
				products79: list79,
				pages: count,
				quantity: quantity,
				branch: manufactorers,
				types: types
			});
		})
		.catch(err => {
			console.log('Error: ' + err);
			return 	res.render('products', {
					products13: null,
					quantity: 0,
					pages: null
			});
		});	

});

router.get('/search', function(req, res, next){
	var type = req.query.type;
	var branch = req.query.branch;
	var maxprice = req.query.maxprice;
	var minprice = req.query.minprice;

	// console.log(type);
	// console.log(minprice);
	// console.log(minprice);
	// console.log(branch);
	//var i = 1;
	var p1 = productRepo.loadByType(type,branch,maxprice,minprice);	
	var p3 = productRepo.loadAllManufacturers();	
	var p4 = productRepo.loadAllTypes();
	Promise.all([p1, p3, p4])
		.then(([prods,manufactorers,types])=>{
			console.log("Loaded product by type");
			console.log(prods);
			var list13 = [];
			var list46 = [];
			var list79 = [];
			var count = [];
			var i = 0;
			var max = i + 3;
			while (i < max) {
				list13.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list46.push(prods[i]);
				i += 1;
			}
			max += 3;
			while (i < max) {
				list79.push(prods[i]);
				i += 1;
			}
			var len = prods.length;
			i = 1;
			while (len > 0) {
				count.push(i);
				len -= 9;
				console.log(len);
				i += 1;
			}
			var quantity = [];
			quantity.push(prods.length);
			//console.log(types);
			return res.render('products', {
				products13: list13,
				products46: list46,
				products79: list79,
				pages: count,
				quantity: quantity,
				branch: manufactorers,
				types: types
			});			
		}).catch(err => {
			console.log('Error: ' + err);
			return 	res.render('products', {
					products13: null,
					quantity: 0,
					pages: null
			});
		});	
	
});

<<<<<<< HEAD
// router.get('/searchbytext', function(req, res, next) { 
// 	var id = req.params.id;
// 	if (id <= 0) {
// 		return res.render('products');
// 	}
// 	var start = 9 * (id - 1);
// 	var p1 = productRepo.loadAllProducts();	
// 	var p3 = productRepo.loadAllManufacturers();	
// 	var p4 = productRepo.loadAllTypes();
// 	Promise.all([p1, p3, p4])
// 		.then(([prods,manufactorers,types])=> {
// 			console.log("Loaded all product.");
// 			//console.log(prods);
// 			var list13 = [];
// 			var list46 = [];
// 			var list79 = [];
// 			var count = [];
// 			var i = start;
// 			var max = i + 3;
// 			while (i < max) {
// 				list13.push(prods[i]);
// 				i += 1;
// 			}
// 			max += 3;
// 			while (i < max) {
// 				list46.push(prods[i]);
// 				i += 1;
// 			}
// 			max += 3;
// 			while (i < max) {
// 				list79.push(prods[i]);
// 				i += 1;
// 			}
// 			var len = prods.length;
// 			i = 1;
// 			while (len > 0) {
// 				count.push(i);
// 				len -= 9;
// 				console.log(len);
// 				i += 1;
// 			}
// 			var quantity = [];
// 			quantity.push(prods.length);
// 			console.log(types);
// 			return res.render('products', {
// 				products13: list13,
// 				products46: list46,
// 				products79: list79,
// 				pages: count,
// 				quantity: quantity,
// 				branch: manufactorers,
// 				types: types
// 			});
// 		})
// 		.catch(err => {
// 			console.log('Error: ' + err);
// 			return 	res.render('products', {
// 					products13: null,
// 					quantity: 0,
// 					pages: null
// 			});
// 		});	

// });
module.exports = router;