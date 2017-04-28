const router = require('./router');
const {upload, center} = require("../api/bigFile");
const {adminIn, adminRender} = require("../api/admin");
const index = require("../api/index");
const download = require("../api/download");
router.get("/signout", (req, res) => {
	req.session.username = null;
	res.redirect("/");
});
router.get("/adminout", (req, res) => {
	req.session.admin = null;
	res.redirect("/admin");
});
router.get("/admin", adminRender);
router.get("/center", center);
router.get("/", index);
router.get("/perfect", (req, res) => {
	if(req.session.username){
		res.render("perfect");
	}
	else{
		res.redirect("/");
	}
});
router.get("/download", download);
module.exports = router;