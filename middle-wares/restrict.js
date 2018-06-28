module.exports = (req, res, next) => {
    if (req.session.isLogged === true) {
        next();
    } else {
    	req.session.retUrl = req.originalUrl;
    	console.log('---------------- middlware' + req.session.retUrl);
        res.redirect('/login');
    }
}