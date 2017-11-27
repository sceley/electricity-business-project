const User = require("../model/user");
module.exports = (req, res) => {
	var user = new User();
	var username = req.session.username;
	var query = {
		username: username
	};
	var data = req.body;
	if(username != req.body.username){
		res.send("完善失败, 姓名不一致");
	}
	else{
		user.findData(query, (err, docs) => {
			if(err) return console.log("失败");
			for(var key in docs._doc){
				data[key] = docs._doc[key];
			}
			delete data._id;
			delete data.__v;
			user.upData(query, data, (err) => {
				if(err) return console.log('失败');
				res.send("成功");
			});
		});
	}
};