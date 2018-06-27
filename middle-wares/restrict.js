module.exports = (req, res, next) => {
    if (req.session.isLogged === true) {
        next();
    } else {
        res.redirect(`/user/login?retUrl=${req.originalUrl}`);
    }
}