const { createTicket, assignTicket, getUserTickets, updateTicketStatus } = require('../models/ticketsModel');

const createTicketController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const ticketId = await createTicket(title, description, req.user.id);
        res.status(201).json({ success: true, message: 'Ticket created', ticketId });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ success: false, message: 'Internal server error while creating ticket' });
    }
};

const assignTicketController = async (req, res) => {
    try {
        const { ticketId, userId } = req.body;
        await assignTicket(ticketId, userId);
        res.status(200).json({ success: true, message: 'Ticket assigned' });
    } catch (error) {
        console.error('Error assigning ticket:', error);
        res.status(500).json({ success: false, message: 'Internal server error while assigning ticket' });
    }
};

const getUserTicketsController = async (req, res) => {
    try {
        const tickets = await getUserTickets(req.user.id);
        res.json({success: true, tickets});
    } catch (error) {
        console.error('Error retrieving user tickets:', error);
        res.status(500).json({ success: false, message: 'Internal server error while retrieving tickets' });
    }
};

const updateTicketStatusController = async (req, res) => {
    try {
        const { ticketId, status } = req.body;
        await updateTicketStatus(ticketId, status, req.user.id);
        res.status(200).json({ success: true, message: 'Ticket status updated' });
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({ success: false, message: 'Internal server error while updating ticket status' });
    }
};

module.exports = { createTicketController, assignTicketController, getUserTicketsController, updateTicketStatusController };
