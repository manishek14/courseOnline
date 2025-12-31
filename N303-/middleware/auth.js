const jwt = require("jsonwebtoken");
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token required" })
    }

    const accessToken = authHeader?.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: `${error}` })
    }
}