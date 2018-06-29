var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var fs = require('fs');
var SHA256 = require('crypto-js/sha256');

router.get('/', function(req, res, next) {
    if (req.session.isLogged) {
        return res.redirect('/');
    }
	return res.render('signin');
});

router.post('/', function(req, res) {
    if (req.session.isLogged) {
        return res.redirect('/user/detail');
    } else {
    	var user = {
    		username: req.body.username,
    		password: SHA256(req.body.password).toString()
    	}
    	console.log(SHA256('admin').toString());
    	userRepo.loadUser(user).then(rows => {
            if (rows.length > 0) {
                req.session.isLogged = true;
                req.session.user = rows[0];
                var url = '/';
                if (req.session.user.displayname === '') {
                    req.session.userdisplayname = req.session.user.username; 
                } else {
                    req.session.userdisplayname = req.session.user.displayname;
                }
                if (req.query.retUrl) {
                    url = req.query.retUrl;
                }
                return res.redirect(url); 
            } else {
                res.redirect('/login', {
                    isFailed: true
                });
            }
        });
    }
});


module.exports = router;