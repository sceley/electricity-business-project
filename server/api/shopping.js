const Shopping = require("../model/shopping");
const shop = (req, res) => {
	var username = req.session.username;
	if(!username) return res.send("请先进行登陆");
	var data = req.body;
	data.product = "iphone7";
	data.username = username;
	var shopping = new Shopping();
	new Promise((resolve, reject) => {
		shopping.saveData(data, (err) => {
			if(err){
				reject("购买失败");
			}
			else{
				resolve("购买成功");
			}
		});
	}).then((data) => {
		res.status(200).send(data);
	}, (data) => {
		res.status(500).send(data);
	});
};
module.exports = shop;