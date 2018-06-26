var db = require('./db');

exports.loadOrders = username => {
	var sql = `select * from orders, productsinorder where orders.user = '${username}' and orders.id = productsinorder.order`;
	return db.load(sql);
}

exports.loadOrdersByID = id => {
	var sql = `select * from orders, productsinorder where orders.id = '${id}' and orders.id = productsinorder.order`;
	return db.load(sql);
}

exports.addOrder = order => {
	var sql = `INSERT INTO orders (id, status, date, user) VALUES ('${order.id}', '${order.status}', ${order.date}, '${order.user}')`;
	return db.save(sql);
}

exports.addProductToOrder = productsinorder => {
	var sql = `INSERT INTO productsinorder (order, product, quantity) VALUES ('${productsinorder.order}', '${productsinorder.product}', ${productsinorder.quantity})`;
	return db.save(sql);
}

exports.updateOrder = order => {
	var sql = `UPDATE orders SET status = '${order.status}', date = ${order.date}, user = '${order.user}' WHERE id = '${order.id}'`;
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