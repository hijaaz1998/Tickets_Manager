const express = require('express');
const {
  createTicketController,
  assignTicketController,
  getUserTicketsController,
  updateTicketStatusController
} = require('../controllers/ticketsController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the ticket
 *         description:
 *           type: string
 *           description: Description of the ticket
 *         ticketId:
 *           type: string
 *           description: ID of the ticket (for assignment and status update)
 *         userId:
 *           type: string
 *           description: ID of the user to whom the ticket is assigned
 *         status:
 *           type: string
 *           description: Status of the ticket (e.g., 'open', 'in-progress', 'closed')
 */

/**
 * @swagger
 * /tickets/create:
 *   post:
 *     tags: [Tickets]
 *     summary: Create a new ticket
 *     description: This endpoint allows a user to create a new ticket.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the ticket
 *               description:
 *                 type: string
 *                 description: Description of the ticket
 *     responses:
 *       201:
 *         description: Ticket successfully created.
 *       500:
 *         description: Internal server error.
 */
router.post('/create', authenticateToken, isAdmin, createTicketController);

/**
 * @swagger
 * /tickets/assign:
 *   post:
 *     tags: [Tickets]
 *     summary: Assign a ticket to a user
 *     description: This endpoint allows an admin to assign a ticket to a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *                 description: ID of the ticket to be assigned
 *               userId:
 *                 type: string
 *                 description: ID of the user to whom the ticket is assigned
 *     responses:
 *       200:
 *         description: Ticket successfully assigned.
 *       500:
 *         description: Internal server error.
 */
router.post('/assign', authenticateToken, isAdmin, assignTicketController);

/**
 * @swagger
 * /tickets/user-tickets:
 *   get:
 *     tags: [Tickets]
 *     summary: Get all tickets for the authenticated user
 *     description: This endpoint allows a user to get all their tickets.
 *     responses:
 *       200:
 *         description: Successfully retrieved user tickets.
 *       500:
 *         description: Internal server error.
 */
router.get('/user-tickets', authenticateToken, getUserTicketsController);

/**
 * @swagger
 * /tickets/update-status:
 *   put:
 *     tags: [Tickets]
 *     summary: Update the status of a ticket
 *     description: This endpoint allows a user to update the status of a ticket.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketId:
 *                 type: string
 *                 description: ID of the ticket whose status is to be updated
 *               status:
 *                 type: string
 *                 description: New status of the ticket
 *     responses:
 *       200:
 *         description: Ticket status successfully updated.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-status', authenticateToken, updateTicketStatusController);

module.exports = router;
