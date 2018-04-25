var mysql = require('mysql');
var Product = require('../models/product');
exports.load = sql => {
    var products = [];
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 7000,
            user: 'root',
            password: '',
            database: 'triplevshop'
        });

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
            	reject(error);
            } else {
                for (i of rows) {
                    var prod = new Product(i);
                    products.push(prod);
                }
            	resolve(products);
            }

            cn.end();
        });
    });
}
