var db = require('../func/db');

exports.loadAllProducts = username => {
	var sql = `select carts.quantity as cartquantity, products.*, carts.quantity*products.price as totalprice from carts, products where user = '${username}' and carts.product = products.id`;
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

exports.removeProducts = (username, id) => {
	var sql = `DELETE FROM carts WHERE product = '${id}' and user = '${username}'`;
	return db.save(sql);
}

exports.updateQuantity = (username, id, quantity) => {
	var sql = `UPDATE carts SET quantity = ${quantity} WHERE user = '${username}' and product = '${id}'`;
	return db.save(sql);
}

exports.loadTotalMoney = username => {
	var sql = `select sum(carts.quantity*products.price) as totalmoney from carts, products where user = '${username}' and carts.product = products.id`;
	return db.load(sql);
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