// do not remove comments in this section for easy debugging

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const requireAuth = async (req, res, next) => {
    console.log("Headers received:", req.headers); // Debug headers

    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.error("Authorization token missing or incorrect format");
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    console.log("Extracted token:", token); // Debug token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debug JWT payload

        // Find user by _id from decoded JWT
        const user = await User.findById(decoded._id).select('_id email name');
        console.log("User found in DB:", user);

        if (!user) {
            console.error("User not found in database!");
            return res.status(401).json({ error: 'User not found, unauthorized request' });
        }

        req.user = user;
        console.log(`Authenticated User: ${user._id} - ${user.email}`);
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired, please log in again' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
};


export default requireAuth;