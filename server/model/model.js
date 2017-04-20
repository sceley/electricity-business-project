const mongoose = require("mongoose");
const db = require("db");
const Schema = new mongoose.Schema({
	image: Buffer,
	name: String,
	password: String,
});
Schema.methods = {
	saveData (callback) {
		this.save(callback);
	};
	findData (query, callback) {
		this.model("store").find(query, callback);
	};
};
module.exports = db.model("store", Schema);