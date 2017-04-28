const db = require("./db");
const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
	username: String,
	product: String,
	color: String,
	version: String,
	store: String,
	time: String
});
Schema.methods.saveData = function  (msg, callback) {
	this.username = msg.username;
	this.product = msg.product;
	this.color = msg.color;
	this.version = msg.version;
	this.store = msg.store;
	this.time = msg.time;
	this.save(callback);
};
Schema.methods.findData = function (query, callback) {
	this.model("Shopping").find(query, callback);
};
module.exports = db.model("Shopping", Schema);