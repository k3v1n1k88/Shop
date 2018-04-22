var db = require('./db');

// exports.loadAll = (fn) => {
// 	var sql = 'select * from products';
// 	db.load(sql, fn);
// }

exports.loadTop10Views = () => {
	var sql = 'select * from products order by view desc limit 10';
	return db.load(sql);
}

exports.loadTop10Buy = () => {
	var sql = 'select * from products order by buy desc limit 10';
	return db.load(sql);
}