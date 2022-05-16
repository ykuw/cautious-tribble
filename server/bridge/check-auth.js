const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // If the API executed doesn't have a valid "access_token", then it won't work to be executed.
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Oi, mate. Not good."
        });
    }
};