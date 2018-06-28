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

exports.loadAllManufacturers = () => {
	var sql = 'select distinct manufacturer from products';
	return db.load(sql);
}

exports.loadAllTypes = () => {
	var sql = 'select distinct type from products';
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

exports.loadProductsWithOrderID = id => {
	var sql = `select products.*, productsinorder.*, orders.id as orderid, status, orders.date as orderdate, user, receivername, receiverphone, receiveraddress, productsinorder.quantity as productsinorderquantity, productsinorder.quantity*products.price as totalprice from productsinorder, products, orders where orders.id = productsinorder.order and productsinorder.product = products.id and orders.id = ${id}`;
	return db.load(sql);
}

exports.updateQuantity = (id, offset) => {
	var sql = `UPDATE products SET quantity = quantity + ${offset} WHERE id = '${id}'`;
	return db.save(sql);
}