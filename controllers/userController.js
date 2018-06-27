var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var fs = require('fs');
var Product = require('../models/product');
var SHA256 = require('crypto-js/sha256');

router.get('/', function(req, res, next) { 
	if (req.session.isLogged) {
		if (req.session.user.username == 'admin') {
			return res.render('admin', {
				// user: req.session.user
			});
		}
		return res.render('user', {
			user: req.session.user
		});
	}
	res.redirect('/');
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