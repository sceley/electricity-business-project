const mongoose = require("mongoose");
const db = require("./db");
const Schema = new mongoose.Schema({
	username: String,
	password: String,
	phonenumber: String
});
Schema.methods.saveData = function  (msg, callback) {
	this.username = msg.username;
	this.password = msg.password;
	this.phonenumber = msg.phonenumber;
	this.save(callback);
};
Schema.methods.findData = function  (query, callback) {
	this.model("user").findOne(query, callback);
};
module.exports = db.model("user", Schema);