const jwt = require('jsonwebtoken');
const config = require('../../config/authConfig');
const db = require('../../models');
const User = db.user;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // If the token is in the format "Bearer <token>", extract only the token part
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Example protected route
const protectedRoute = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    verifyToken,
    protectedRoute
};
