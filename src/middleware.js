export const localsSetting = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    return next();
};

export const shouldLogInForThisUrl = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    };
    if (!req.session.loggedIn) {
        return res.redirect("/login");
    };
};

export const shouldNotLogInForThisUrl = (req, res, next) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    };
    if (!req.session.loggedIn) {
        return next();
    };    
};