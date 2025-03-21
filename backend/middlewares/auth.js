require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_KEY;

const fetchUser = (req, res, next) => {
    let token = req.header("auth-token");

    if (!token) return res.status(401).json({ message: "Invalid or missing token" });

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const data = jwt.verify(token, jwtKey);
        req.user = data.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Please authenticate using a valid token" });
    }
};

module.exports = fetchUser;

