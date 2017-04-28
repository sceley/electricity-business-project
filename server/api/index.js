const Comment = require("../model/comment");
const index =  (req, res) => {
	var comment = new Comment();
	new Promise((resolve) => {
		comment.findData(null, (err, docs) => {
			resolve(docs);
		});
	}).then((data) => {
		var obj = {
			username: req.session.username || "",
			msg: data
		};
		if(data.length > 0){
			obj.bool = true;
			res.render("index", obj);
		}
		else{
			obj.bool = false;
			res.render("index", obj);
		}
	});
};
module.exports = index;