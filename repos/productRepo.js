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

exports.updateProduct = prod => {
	console.log('----------------- +++++++++++++');
	var sql = `UPDATE products SET name = '${prod.name}',
					type = '${prod.type}',
					manufacturer = '${prod.manufacturer}', 
					quantity = ${prod.quantity}, 
					price = ${prod.price}
				WHERE id = '${prod.id}'`;
	console.log(`----------------- +++++++++++++ ${prod.id}`);
	return db.save(sql);
}

exports.updateQuantityAndBuy = (id, offset) => {
	var sql = `UPDATE products SET quantity = quantity + ${offset}, buy = buy - ${offset}  WHERE id = '${id}'`;
	return db.save(sql);
}

<<<<<<< HEAD

exports.updateQuantityAndBuy = (id, offset) => {
	var sql = `UPDATE products SET quantity = quantity + ${offset}, buy = buy - ${offset}  WHERE id = '${id}'`;
	return db.save(sql);
}

=======
>>>>>>> 9c9bd8cfe1dbe9da68930f528fa03a6fd094e610
exports.loadByType = (type,branch,maxprice,minprice) => {
	console.log(type);
	console.log(branch===undefined);
	console.log(Number(maxprice));
	console.log(Number(minprice));
	var maxprice = Number(maxprice);
	var minprice = Number(minprice);
	var list_sp='';
	if(!(type===undefined)){
		if(Array.isArray(type)){
			for(var i = 0;i<type.length;i++){
				list_sp+=`type = '${type[i]}' `;
				if(i<type.length-1){
					list_sp+='or ';
				}
			}
		}
		else{
			list_sp+=`type = '${type}' `
		}
		if(!(branch===undefined))
			list_sp+=" and ";
	}
	console.log(list_sp);
	if(!(branch===undefined)){
		if(Array.isArray(branch)){
			for(var i = 0;i<branch.length;i++){
				list_sp+=`manufacturer = '${branch[i]}' `;
				if(i<branch.length-1){
					list_sp+='or ';
				}
			}
		}
		else{
			list_sp+=`manufacturer = '${branch}' `
		}
		if(maxprice>0||minprice>0)
			list_sp+=" and ";
	}
	if(maxprice>0){
		list_sp+=` price > ${minprice}`;
		if(minprice>0)
			list_sp+=` and `;
	}
	if(maxprice>0){
		list_sp+=` price < ${maxprice}`;
	}
	console.log(list_sp);
	if(!(list_sp===''))
		list_sp='where '+list_sp;
	console.log(list_sp);
	var sql = `select * from products ${list_sp}`;
	return db.load(sql);
<<<<<<< HEAD
}

exports.loadUpdateView = id =>{
	var sql = `UPDATE products set view = view+1 WHERE id = '${id}'`;
	return db.save(sql);
}
exports.loadSameTypeById = id=>{
	var sql = `SELECT * FROM products WHERE type = (SELECT type FROM products WHERE id='${id}')`
	return db.load(sql);
};
exports.loadSameBranchByID = id=>{
	var sql = `SELECT * FROM products WHERE manufacturer = (SELECT manufacturer FROM products WHERE id='${id}')`
	return db.load(sql);
=======
>>>>>>> 9c9bd8cfe1dbe9da68930f528fa03a6fd094e610
}