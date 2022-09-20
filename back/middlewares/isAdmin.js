const User = require("../models/User");

module.exports = (req, res, next) => {
    const body = req.body;

    const userId = body.userId;

    res.locals.isAdmin = 0;

    User.findOne({ _id: userId })
        .then((user) => {
            if (user && user.admin)
                res.locals.isAdmin = 1;
        })
        .catch(() => res.locals.isAdmin = 0);

    next();
};