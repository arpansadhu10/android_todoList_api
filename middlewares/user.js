const bigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
const User = require("../models/user");



exports.isLoggedIn = bigPromise(async (req, res, next) => {
    console.log("AM HEREEE");
    const token = req.header('Authorization');
    console.log(token);

    if (!token) {
        return next(new Error("Login first to continue..."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();

})