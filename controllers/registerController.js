var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var fs = require('fs');
var SHA256 = require('crypto-js/sha256');

router.get('/', function(req, res, next) {
    console.log('---------------- register');
	return res.render('signup');
});

// router.post('/', function(req, res) {
// 	var user = {
// 		username: req.body.username,
// 		password: SHA256(req.body.password).toString()
// 	}
// 	console.log(SHA256('admin').toString());
// 	userRepo.loadUser(user).then(rows => {
//         if (rows.length > 0) {
//             req.session.isLogged = true;
//             req.session.user = rows[0];
//             req.session.cart = [];
//             console.log('**************************');
//             var url = '/';
//             if (req.query.retUrl) {
//                 url = req.query.retUrl;
//             }
//             res.redirect('/');
//         } else {
//             var vm = {
//                 showError: true,
//                 errorMsg: 'Login failed'
//             };
//             res.redirect('/');
//         }
//     });
// });


module.exports = router;