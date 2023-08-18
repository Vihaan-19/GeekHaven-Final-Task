const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
        res.status(401).send("Invalid Authorization");

    try {
        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, process.env.secret_key);
        req.userId = payload.id;
        next();
    }
    catch (err) {
        res.status(403).send(err);
    }
};


module.exports = auth;
