const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test"
const db = mongoose.createConnection(url);
db.on("open", () => {
	console.log(`server have connected database`);
});
module.exports = db;