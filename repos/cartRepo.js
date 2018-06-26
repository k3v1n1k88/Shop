var db = require('../func/db');

exports.loadCart = username => {
	var sql = `select * from carts where user = '${username}'`;
	return db.load(sql);
}

exports.addCart = cart => {
	var sql = `INSERT INTO carts (user, product, quantity) VALUES ('${cart.user}', '${cart.product}', ${cart.quantity})`;
	return db.save(sql);
}

exports.updateCart = cart => {
	var sql = `UPDATE carts SET quantity = ${cart.quantity} WHERE user = '${cart.user}' and product = '${cart.product}'`;
	return db.save(sql);
}

exports.removeCart = username => {
	var sql = `DELETE FROM carts WHERE user = '${username}'`;
	return db.save(sql);
}


// exports.loadTopViews = top => {
// 	var sql = `select * from products order by view desc limit ${top}`;
// 	return db.load(sql);
// }

// exports.loadAllProducts = () => {
// 	var sql = 'select * from products';
// 	return db.load(sql);
// }

// exports.loadTopBuy = top => {
// 	var sql = `select * from products order by buy desc limit ${top}`;
// 	return db.load(sql);
// }

// exports.loadTopNews = top => {
// 	var sql = `select * from products order by date desc limit ${top}`;
// 	return db.load(sql);
// }

// exports.loadById = id => {
// 	var sql = `select * from products where id = '${id}'`;
// 	return db.load(sql);
// }

// exports.loadByIds = ids => {
// 	var sql = `select * from products where `;
// 	var flag = false;
// 	for (i of ids) {
// 		if (flag) {
// 			sql += `or id = '${i}' `;
// 		} else {
// 			sql += `id = '${i}' `;
// 			flag = true;
// 		}
// 	}
	
// 	return db.load(sql);
// }