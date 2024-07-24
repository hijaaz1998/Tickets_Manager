const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         role:
 *           type: string
 *           description: Role of the user
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Email already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in an existing user
 *     description: This endpoint allows an existing user to log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', login);

module.exports = router;
