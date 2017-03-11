// takes request object and levereages passport to determine if user is authenticated
exports.IsAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
		next();
	} else {
		// 401 - unauthorized
		next(new Error(401));
	}
}

exports.destroySession = function(req, res, next) {
	req.logOut();
	req.session.destroy()
	res.redirect("/")
}

