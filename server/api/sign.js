const User = require("../model/user");
const signup = (req, res) => {
	var user = new User();
	var username = req.body.username;
	var data = req.body;
	var query = {
		username: username
	};
	new Promise((resolve, reject) => {
		user.findData(query, (err, docs) => {
			if(err) return resolve("注册失败");
			if(docs){
				resolve("用户名已被注册");
			}
			else{
				user.saveData(data, (err, docs) => {
					if(err) resolve("注册失败");
					resolve("注册成功");
				});
			}
		});
	}).then((msg) => {
		res.send(msg);
	});
};
const signin = (req, res) => {
	var user = new User();
	var username = req.body.username;
	var password = req.body.password;
	var query = {
		username: username
	};
	new Promise((resolve, reject) => {
		user.findData(query, (err, docs) => {
			if(err) return resolve("登陆失败");
			if(!docs){
				resolve("用户不存在");
			}
			else{
				if(docs.password == password){
					req.session.username = username;
					if(docs.college){
						resolve(200);
					}
					else{
						resolve(304);
					}
				}
				else
				{
					resolve("密码错误");
				}
			}
		});
	}).then((status) => {
		if(status == 200){
			res.send(`${req.session.username},你登陆成功`);
		}
		else{
			res.send("304");
		}
	});
};
module.exports = {signup, signin};