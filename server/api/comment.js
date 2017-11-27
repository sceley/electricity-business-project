const Shopping = require("../model/shopping");
const Comment  = require("../model/comment");
const comment = (req, res) => {
	var shopping = new Shopping();
	var query = {
		username: req.session.username
	};
	var saveComment = new Comment();
	new Promise((resolve, reject) => {
		shopping.findData(query, (err, docs) => {
			if(err) return console.log("出错了");
			var msg = {
				username: docs[0].username,
				comment: req.body.comment,
				store: docs[0].store,
				version: docs[0].version,
				color: docs[0].color
			};
			resolve(msg);
		})
	}).then((data) => {
		return new Promise((resolve) => {
			saveComment.saveData(data, (err) => {
				if(err)  return console.log('出错了');
				resolve("评论成功");
			});
		});
	}).then((data) => {
		res.send(data);
	});
};
module.exports = comment;