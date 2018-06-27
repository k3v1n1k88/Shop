var db = require('../func/db');

// exports.loadAll = (fn) => {
// 	var sql = 'select * from products';
// 	db.load(sql, fn);
// }

exports.loadTopViews = top => {
	var sql = `select * from products order by view desc limit ${top}`;
	return db.load(sql);
}

exports.loadAllProducts = () => {
	var sql = 'select * from products';
	return db.load(sql);
}

exports.loadTopBuy = top => {
	var sql = `select * from products order by buy desc limit ${top}`;
	return db.load(sql);
}

exports.loadTopNews = top => {
	var sql = `select * from products order by date desc limit ${top}`;
	return db.load(sql);
}

exports.loadById = id => {
	var sql = `select * from products where id = '${id}'`;
	return db.load(sql);
}

exports.loadByIds = ids => {
	var sql = `select * from products where `;
	var flag = false;
	for (i of ids) {
		if (flag) {
			sql += `or id = '${i}' `;
		} else {
			sql += `id = '${i}' `;
			flag = true;
		}
	}
	
	return db.load(sql);
}