const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // If the API executed doesn't have a valid "access_token", then it won't work to be executed.
    try {
        const token = req.headers.authorization.split(" ")[1]; // The token is in the form of "Bearer <token>".
        req.userData = jwt.verify(token, process.env.JWT_KEY); // The token is verified and the userData is stored in the req object.
        next();
    } catch (error) { // If the API executed doesn't have a valid "access_token", then it won't work to be executed.
        return res.status(401).json({
            message: "Oi, mate. Not good."
        });
    }
};