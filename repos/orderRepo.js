var db = require('../func/db');

exports.loadOrders = username => {
	var sql = `select * from orders, productsinorder where orders.user = '${username}' and orders.id = productsinorder.order`;
	return db.load(sql);
}

exports.loadAllOrders = () => {
	var sql = 'select * from orders';
	return db.load(sql);
}

exports.loadAllOrdersWithUsername = username => {
	var sql = `select * from orders where user = '${username}' ORDER BY date DESC`;
	console.log('--------- loadAllOrdersWithUsername ' + sql);
	return db.load(sql);
}

exports.loadAllProducts = () => {
	var sql = `select products.*, productsinorder.* from productsinorder, products where productsinorder.product = products.id`;
	return db.load(sql);
}

exports.loadOrdersAndProductsByID = id => {
	var sql = `select * from orders, productsinorder where orders.id = '${id}'`;
	return db.load(sql);
}

exports.insertOrder = order => {
	var sql = `INSERT INTO orders (status, date, user, receivername, receiverphone, receiveraddress) VALUES ('${order.status}', '${order.date}', '${order.user}', '${order.receivername}', ${order.receiverphone}, '${order.receiveraddress}')`;
	return db.save(sql);
}

exports.insertProductToOrder = productsinorder => {
	var sql = `INSERT INTO productsinorder VALUES ('${productsinorder.order}', '${productsinorder.product}', ${productsinorder.quantity})`;
	return db.save(sql);
}

exports.updateOrder = order => {
	var sql = `UPDATE orders SET status = '${order.status}', date = ${order.date}, user = '${order.user}', recivername = '${order.receivername}', reciverphone = ${order.receiverphone}, reciveraddress = '${order.receiveraddress}' WHERE id = '${order.id}'`;
	return db.save(sql);
}

exports.loadLastOrderID = username => {
	var sql = `select max(id) as id from orders where user = '${username}'`;
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