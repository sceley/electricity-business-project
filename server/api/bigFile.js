const path = require("path");
const fs = require("fs");
const Shopping = require("../model/shopping");
const filepath = path.join(__dirname, `../../public/cimages`);
const upload = (req, res) => {
	var buffer = req.files[0].buffer;
	var writePath = `${filepath}/${req.session.username}.png`;
	fs.writeFile(writePath, buffer, (err) => {
		if(err){
			res.status(500).end("上传失败");
		}
		else{
			res.status(304).end();
		}
	});
};
var createdata = (username) => {
	var goods = new Shopping();
	var query = {
		username: username
	};
	return new Promise((resolve, reject) => {
		goods.findData(query, (err, docs) => {
			if(err) return console.log('出错了');
			resolve(docs);
		});
	}).then((data) => {
		var option = {
			username: username,
			imgsrc: "default.png"
		};
		if(data.length > 0){
			option.bool = true;
			option.things = data;
		}
		else{
			option.bool = false;
		}
		return new Promise((resolve, reject) => {
			resolve(option);
		});
	});
};
const center = (req, res) => {
	var username = req.session.username;
	if(username){
		createdata(username).then((option) => {
			fs.readdir(filepath, (err, files) => {
				files.forEach((file) => {
					if(file == `${username}.png`){
						option.imgsrc = `${username}.png`;
					}
				});
				res.render("center", option);
			});
		});
	}
	else{
		res.redirect("/");
	}
};
module.exports = {upload, center};