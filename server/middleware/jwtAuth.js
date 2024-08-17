const jwt = require('jsonwebtoken');

const jwtAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided." });
        }

        const jwtToken = authHeader.split(" ")[1];
        if (!jwtToken) {
            return res.status(401).json({ message: "No token provided." });
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET || 'your_secret_key', (error, payload) => {
            if (error) {
                return res.status(401).json({ message: "Invalid JWT token" });
            } else {
                req.userId = payload.id;
                next();
            }
        });
    } catch (e) {
        console.log('middleware', e);
        res.status(401).json({ message: 'Auth failed' });
    }
};

module.exports = jwtAuth;
