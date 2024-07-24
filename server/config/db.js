const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const pool = mysql.createPool(dbConfig);

const createDatabaseAndTables = async () => {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        await connection.query(`USE \`${dbConfig.database}\`;`);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'user') NOT NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status ENUM('in progress', 'cancelled', 'closed') DEFAULT 'in progress',
                assigned_to INT,
                created_by INT NOT NULL,
                FOREIGN KEY (assigned_to) REFERENCES users(id),
                FOREIGN KEY (created_by) REFERENCES users(id)
            );
        `);
    } catch (err) {
        console.error('Failed to create database and tables:', err);
    } finally {
        await connection.end();
    }
};

module.exports = { pool, createDatabaseAndTables };
