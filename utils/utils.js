const jwt = require('jsonwebtoken');
module.exports.requireSignIn = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }
    else {
        return res.status(200).json({ message: "Authorization required" });
    }
    next();
}