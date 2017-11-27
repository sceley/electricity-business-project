const Shopping = require("../model/shopping");
const User = require("../model/user");
const Create = require("./createdata");
const fs = require("fs");
const path = require("path");
var filepath = path.join(__dirname, "../../客户信息.xlsx");
const findUser = (client) => {
	return new Promise((resolve, reject) => {
		client.findData(null, (err, docs) => {
			resolve(docs);
		});
	});
};
const findShop = (query, shopping) => {
	return new Promise((resolve, reject) => {
		shopping.findData(query, (err, docs) => {
			resolve(docs);
		});
	});
};
const sync = (shopping, data) => {
	return new Promise((resolve, reject) => {
		var array = [];
		var msg = [];
		// var readUser = async () => {
		// 	for(let i = 0; i < data.length; i++){
		// 		let keys = Object.keys(data[i]._doc);
		// 		let values = [];
		// 		for(let j = 0; j < keys.length; j++){
		// 			values[j] = data[i]._doc[keys[j]];
		// 		}
		// 		let query = {
		// 			username: data[i].username
		// 		};
		// 		array[i] = await findShop(query, shopping);
		// 		keys.push("shopping");
		// 		values.push(array[i]);
		// 		let news = new Create(keys, values);
		// 		delete news._id;
		// 		delete news.__v;
		// 		msg.push(news);
		// 	}
			resolve(msg);
		// };
		// readUser();
	});
};
var file = (data) => {
	return new Promise((resolve, reject) => {
		var str = "";
		data.forEach((item) => {
			str += "客户信息: \t" + item.username + "\t"
			 + item.dormitory + "\t"
			 + item.major + "\t"
			 + item.phonenumber + '\t'
			 + item.college + "\r"
			 + "购买信息: \r";
			 item.shopping.forEach((single) => {
			 	str += "\t" + single.version + "\t"
			 	 + single.color + "\t"
			 	 + single.time + "\t"
			 	 + single.product + "\t"
			 	 + single.store + "\r";
			 });
			 str += "\r";
		});
		fs.writeFile(filepath, str, (err) => {
			if(err) return console.log('出错了');
			resolve();
		});
	});
};
module.exports = (req, res) => {
	if(req.session.admin){
		var client = new User();
		var shopping = new Shopping();
		findUser(client).then((data) => {
			sync(shopping, data).then((msg) => {
				file(msg).then((data) => {
					res.download(filepath);
				});
				
			});
		});
	}
	else{
		res.redirect("/admin");
	}
};