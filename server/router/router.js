const express = require("express");
const path = require("path");
router = express.Router();
router.get("/admin/land", (req, res) => {
	res.render("adminland");
});
router.get("/admin", (req, res) => {
	res.render("admin");
});
router.get("/center", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/html/center.html"));
});
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/html/index.html"));
});
module.exports = router;