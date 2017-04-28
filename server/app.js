const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const storeSession = require("connect-mongo")(session);
const path = require("path");
const http = require("http");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const Router = require("./router/main");
const app = express();
const server = http.createServer(app);
const db = require("./model/db");
app.use(session({
	secret: "yongliqin",
	key: "phone",
	cookie: {
		maxAge: 1000 * 60 * 20
	},
	store: new storeSession({
		mongooseConnection: db
	})
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
server.listen(port, () => {
	console.log(`server runing at http://localhost:${port}`);
});
app.use(bodyParser());
app.use(Router);
module.exports = port;