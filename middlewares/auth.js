const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
    //Getting the header
    const authHeader = req.headers.authorization;

    //Check the header
    if (!authHeader || !authHeader.startsWith("Bearer"))
        res.status(401).send("Invalid Authorization");

    try {
        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, process.env.secret_key);
        //Update req.userId, we will need it later
        req.userId = payload.id;
        next();
    }
    catch (err) {
        res.status(403).send(err);
    }
};


module.exports = auth;
