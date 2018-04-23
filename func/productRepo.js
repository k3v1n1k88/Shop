var db = require('./db');

// exports.loadAll = (fn) => {
// 	var sql = 'select * from products';
// 	db.load(sql, fn);
// }

exports.loadTopViews = top => {
	var sql = `select * from products order by view desc limit ${top}`;
	return db.load(sql);
}

exports.loadTopBuy = top => {
	var sql = `select * from products order by buy desc limit ${top}`;
	return db.load(sql);
}

exports.loadById = id => {
	var sql = `select * from products where id = '${id}'`;
	return db.load(sql);
}