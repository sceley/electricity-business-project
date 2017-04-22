const express = require("express");
const path = require("path");
const user = require("../model/user");
const multer = require("multer");
const querystring = require("querystring");
const fs = require("fs");
router = express.Router();
router.use((req, res, next) => {
	if(!req.session.username) req.session.username = null;
	next(); 
});
router.get("/", (req, res) => {
	res.render("index", req.session);
});
router.post("/signup", (req, res) => {
	var register = new user();
	new Promise((resolve, reject) => {
		register.findData({username: req.body.username}, (err, docs) => {
			if(err) return resolve("注册失败");
			if(docs){
				resolve("用户名已被注册");
			}
			else{
				register.saveData(req.body, (err, docs) => {
					if(err) resolve("注册失败");
					resolve("注册成功");
				});
			}
		});
	}).then((msg) => {
		res.send(msg);
	});
});
router.post("/signin", (req, res) => {
	var land = new user();
	new Promise((resolve, reject) => {
		land.findData({username: req.body.username}, (err, docs) => {
			if(err) return resolve("登陆失败");
			console.log(docs);
			if(!docs){
				resolve("用户不存在");
			}
			else{
				if(docs.password == req.body.password)
				{
					req.session.username = req.body.username;
					resolve(`${req.body.username},你登陆成功`);
				}
				else
				{
					resolve("密码错误");
				}
			}
		});
	}).then((msg) => {
		res.send(msg);
	});
});
router.get("/signout", (req, res) => {
	req.session.username = null;
	res.redirect("/");
});
router.post("/upload", multer({}).array("file"), (req, res) => {
	const filename = req.session.username;
	filepath = path.join(__dirname, `../../public/client_img/${filename}.png`);
	fs.writeFile(filepath, req.files[0].buffer, (err) => {
		if(err) return console.log('失败');
		else{
			res.redirect("/center");
		}
	});
});
router.post("/admin", (req, res) => {
	if(req.body.username == "yongliqin" && req.body.password == "666666")
	{
		req.session.admin = true;
		res.redirect("/adminc");
	}
	else{
		res.send("failure");
	}
});
router.get("/adminc", (req, res) => {
	if(req.session.admin)
	{
		res.render("adminc");
	}
	else
	{
		res.redirect("/adminl");
	}
});
router.get("/adminl", (req, res) => {
	res.render("adminl");
});
router.get("/adminout", (req, res) => {
	req.session.admin = false;
	res.redirect("/adminl");
});
router.get("/center", (req, res) => {
	var option = {
		username: req.session.username,
		imgsrc: "default"
	};
	if(req.session.username){
		fs.readdir(path.join(__dirname, "../../public/client_img"), (err, files) => {
			files.forEach((file) => {
				if(file == `${req.session.username}.png`){
					option.imgsrc = req.session.username;
				}
			});
			res.render("center", option);
		}); 
	}
	else{
		res.redirect("/");
	}
});

module.exports = router;