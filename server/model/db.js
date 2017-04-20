const mongoose = require("mongoose");
const option = {
	pass: 666666,
	user: yongliqin
};
const url = "mongodb://localhost:27017/test"
const db = mongoose.createConnection(url, option);
db.on("open", () => {
	console.log(`server have connected database`);
});
module.exports = db;