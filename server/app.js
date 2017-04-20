const express = require("express");
const path = require("path");
const http = require("http");
const jade = require("jade");
const port = process.env.PORT || 3000;
const Router = require("./router/router");
const app = express();
const server = http.createServer(app);
app.use(Router);

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static("C:/Users/VULCAN/Desktop/project/client"));
server.listen(port, () => {
	console.log(`server runing at http://localhost:${port}`);
});
module.exports = port;