const db = require("./db");
const mongoose = require("mongoose");
Schema = mongoose.Schema({
	username: String,
	product: String,
	color: String,
	version: String,
	store: String,
	time: String,
	price: Number
});
Schema.methods.saveData = function  (msg, callback) {
	this.username = msg.username;
	this.product = msg.product;
	this.color = msg.color;
	this.version = msg.version;
	this.store = msg.store;
	this.time = msg.time;
	this.price = msg.price;
	this.save(callback);
};
Schema.methods.findData = function (query, callback) {
	this.model("cart").find(query, callback);
};
module.exports = db.model("cart", Schema);