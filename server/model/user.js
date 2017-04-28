const mongoose = require("mongoose");
const db = require("./db");
const Schema = new mongoose.Schema({
	username: String,
	password: String,
	phonenumber: String,
	college: String,
	major: String,
	dormitory: String
});
Schema.methods.saveData = function  (msg, callback) {
	this.username = msg.username;
	this.password = msg.password;
	this.phonenumber = msg.phonenumber;
	this.save(callback);
};
Schema.methods.upData = function  (replace, updata, callback) {
	this.model("User").update(replace, updata, callback);
};
Schema.methods.findData = function  (query, callback) {
	if(query instanceof Object){
		this.model("User").findOne(query, callback);
	}
	else{
		query = {};
		this.model("User").find(query, callback);
	}
	
};
module.exports = db.model("User", Schema);