const mongoose = require("mongoose");
const db = require("./db");
const Schema = new mongoose.Schema({
	username: String,
	comment: String,
	color: String,
	store: String,
	version: String
});
Schema.methods.saveData = function  (msg, callback) {
	this.username = msg.username;
	this.comment = msg.comment;
	this.color = msg.color;
	this.store = msg.store;
	this.version = msg.version;
	this.save(callback);
};
Schema.methods.findData = function  (query, callback) {
	this.model("Comment").find(query, callback);
};
module.exports = db.model("Comment", Schema);