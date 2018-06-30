var db = require('../func/db');

exports.loadUserByUsername = username => {
	var sql = `select * from users where username = '${username}'`;
	return db.load(sql);
}

exports.loadUser = user => {
	var sql = `select * from users where username = '${user.username}' and password = '${user.password}'`;
	return db.load(sql);
}

exports.insertUser = user => {
	var sql = `INSERT INTO users VALUES ('${user.username}', '${user.password}', '${user.email}', ${user.phone}, '${user.displayname}', '${user.birthday}')`;
	console.log('-------------------- que ' + sql);
	return db.save(sql);
}

exports.updateUser = user => {
	var sql = `UPDATE users SET password = '${user.password}', email = '${user.email}', phone = ${user.phone}, displayname = '${user.displayname}', birthday = '${user.birthday}' WHERE username = '${user.username}'`;
	console.log('------------------- udapte user ' + sql);
	return db.save(sql);
}


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