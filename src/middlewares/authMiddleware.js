const jwt = require('jsonwebtoken');

const addUserDataToReq = (req, jwt_token) => {
    const tokenPayload = jwt.verify(jwt_token, 'secret-jwt-key');
    req.user = {
        _id: tokenPayload._id
    };
};

const authJWT = (req, res, next) => {
    const jwt_token = req.headers.jwt_token;
    if (!jwt_token) {
        return res.status(400).json({ message: 'No jwt_token provided' });
    }
    try {
        addUserDataToReq(req, jwt_token);
        next();
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = { authJWT };
