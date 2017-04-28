const Shopping = require("../model/shopping");
const User = require("../model/user");
const Create = require("./createdata");
const adminIn = (req, res) => {
	if(req.body.username == "yongliqin" && req.body.password == "666666"){
		req.session.admin = true;
		res.status(304).end();
	}
	else{
		res.status(200).end("密码错误");
	}
};
const findUser = (client) => {
	return new Promise((resolve, reject) => {
		client.findData(null, (err, docs) => {
			resolve(docs);
		});
	})
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
		var readUser = async () => {
			for(let i = 0; i < data.length; i++){
				let keys = Object.keys(data[i]._doc);
				let values = [];
				for(let j = 0; j < keys.length; j++){
					values[j] = data[i]._doc[keys[j]];
				}
				let query = {
					username: data[i].username
				};
				array[i] = await findShop(query, shopping);
				keys.push("shopping");
				values.push(array[i]);
				let news = new Create(keys, values);
				delete news._id;
				delete news.__v;
				msg.push(news);
			}
			resolve(msg);
		};
		readUser();
	});
}
const adminRender = (req, res) => {
	if(req.session.admin == true)
	{
		var client = new User();
		var shopping = new Shopping();
		findUser(client).then((data) => {
			let obj = {};
			if(data.length == 0){
				obj.bool = false;
				res.render("admin", obj);
			}
			else{
				sync(shopping, data).then((msg) => {
					obj.data = msg;
					obj.bool = true;
					res.render("admin", obj);
				});
			}
		});
	}
	else
	{
		res.render("adminIn");
	}
};
module.exports = {adminIn, adminRender};