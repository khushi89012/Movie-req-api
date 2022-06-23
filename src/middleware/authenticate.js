require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}


module.exports = async (req, res, next) => {
    if (!req.headers.authorization) 
        return res.status(401).send({
            message: "No token provided",
        });

    if(!req.headers.authorization.startsWith("Bearer "))
        return res.status(401).send({
            message: "Invalid token",
        });

    const token = req.headers.authorization.split(" ")[1];
    var user;
    try {
        user = await verifyToken(token);
    } catch (error) {
        return res.status(401).send({
            message: "Invalid token",
        });
    }
    req.user = user;
    next();
}
