const express = require("express");
const app = express();

// Middleware - Imports
const logs = require("./middleware/logs");

// Route - Imports
const studentRoutes = require("./routes/students");

/**
 * Middleware
 */

// Parsing request.body
app.use(express.json());
app.use("/api", logs);

/**
 * Routes
 */

app.use("/api/students", studentRoutes);

module.exports = app;
