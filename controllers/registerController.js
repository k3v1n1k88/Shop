var express = require('express');
var router = express.Router();
var productRepo = require('../repos/productRepo.js');
var userRepo = require('../repos/userRepo.js');
var fs = require('fs');
var SHA256 = require('crypto-js/sha256');
var moment = require('moment');

router.get('/', function(req, res, next) {
    if (req.session.isLogged) {
        return res.redirect('/user/detail');
    }
	return res.render('signup');
});

router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.emnail;
    var phone = req.body.phone;
    var displayname = req.body.displayname;
    var retype_password = req.body.retype_password;
    if (password !== retype_password) {
        return res.render('signup', {
            isWrongPassword: true
        });
    } else if (username === '' || username === null ||
        password === '' || password === null ||
        retype_password === '' || retype_password === null) {
        return res.render('signup', {
            isFailed: true
        });
    } else {
        // var dob = moment(req.body.birthday, 'mm/dd/YYYY').format('YYYY-MM-DD');
        // console.log('++++++++++++++ insertUser dob ' + dob);
        if (email === undefined) {
            
            email = '';
        }
        console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; phone ' + phone);
        if (phone === null || phone === '') {
            console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
            phone = 0;
        }
        var user = {
            username: username,
            password: SHA256(password).toString(),
            email: email,
            phone: phone,
            displayname: displayname,
            birthday: req.body.birthday
        }
        userRepo.insertUser(user)
            .then(value => {
                console.log('++++++++++++++ insertUser value ' + value);
                if (value) {
                    console.log('++++++++++++++ insertUser OK');
                    req.session.isSuccess = true;
                    var url = '/';
                    if (req.query.retUrl) {
                        url = req.query.retUrl;
                    }
                    return res.redirect(url);
                } else {
                    console.log('++++++++++++++ insertUser failed');
                    return res.render('signup', {
                        isFailed: true
                    });
                }
            })
            .catch(error => {
                console.log('++++++++++++++ insertUser failed');
                return res.render('signup', {
                    isFailed: true
                });
            });
    }
});


module.exports = router;