const { pool } = require('../config/db');

const createTicket = async (title, description, createdBy) => {
    try {
        const [result] = await pool.query('INSERT INTO tickets (title, description, created_by) VALUES (?, ?, ?)', [title, description, createdBy]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw new Error('Error creating ticket');
    }
};

const assignTicket = async (ticketId, userId) => {
    try {
        await pool.query('UPDATE tickets SET assigned_to = ? WHERE id = ?', [userId, ticketId]);
    } catch (error) {
        console.error('Error assigning ticket:', error);
        throw new Error('Error assigning ticket');
    }
};

const getUserTickets = async (userId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tickets WHERE created_by = ? OR assigned_to = ?', [userId, userId]);
        return rows;
    } catch (error) {
        console.error('Error retrieving user tickets:', error);
        throw new Error('Error retrieving user tickets');
    }
};

const updateTicketStatus = async (ticketId, status, userId) => {
    try {
        await pool.query('UPDATE tickets SET status = ? WHERE id = ? AND (created_by = ? OR assigned_to = ?)', [status, ticketId, userId, userId]);
    } catch (error) {
        console.error('Error updating ticket status:', error);
        throw new Error('Error updating ticket status');
    }
};

module.exports = { createTicket, assignTicket, getUserTickets, updateTicketStatus };
