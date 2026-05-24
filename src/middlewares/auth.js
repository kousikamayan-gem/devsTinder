const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =async (req, res, next) => {
    try {
        const verifyToken = jsonwebtoken.verify(req.cookies.token, "DEVS@TINDER");
        if (!verifyToken) {
            return res.status(401).send("Unauthorized");
        }
        const user = await User.findById(verifyToken._id);
        if (!user) {
            return res.status(401).send("Unauthorized");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

module.exports = {
    userAuth,
}