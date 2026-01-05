const jwt = require("jsonwebtoken");
const path = require("path")
const userModel = require("../models/user")
require("dotenv").config({ path: path.join(__dirname, ".env") })

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token required" })
    }

    const accessToken = authHeader?.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).lean()
        Reflect.deleteProperty(user, "password")
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({ message: `${error}` })
    }
}