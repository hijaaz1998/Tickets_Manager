const jwt = require('jsonwebtoken')
const { pool } = require('../config/db');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) return res.status(401).json({ success: false, message: 'Token missing' });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT role FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
        if (rows[0].role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    authenticateToken,
    isAdmin
}
