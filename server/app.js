const express = require('express');
const bodyParser = require('body-parser');
const { createDatabaseAndTables } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tickets Managing System",
            version: "1.0.0",
            description: "A simple ticket managing system app with Node, Express and MySql"
        },
        servers: [
            {
                url: "http://localhost:2000"
            },
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;

createDatabaseAndTables().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to create database and tables:', err);
});
