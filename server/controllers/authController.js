const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { getUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const isExisting = await(getUserByEmail(email));
        if(isExisting){
            return res.status(400).json({success: false, message: 'Email already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);

        res.status(201).json({success: true, message: 'User successfully registered'});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'})
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        resstats(200).json({ token, success: true, message: 'Login successfull' });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'})
    }
};

module.exports = { register, login };
