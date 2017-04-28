const session = (req, res, next) => {
	if(!req.session.username){
		req.session.username = null;
	}
	if(!req.session.admin){
		req.session.admin = null;
	}
	next();
};
module.exports = session;