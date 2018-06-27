var mysql = require('mysql');

exports.load = sql => {
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
            	resolve(rows);
            }

            cn.end();
        });
    });
}

exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: 'localhost',
            port: 7000,
            user: 'root',
            password: '',
            database: 'triplevshop'
        });

        cn.connect();

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}
