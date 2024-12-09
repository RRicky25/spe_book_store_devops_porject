const winston = require('winston');
const path = require('path');

// Create a new Winston logger instance
const logger = winston.createLogger({
    level: 'info', // Set default logging level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Use JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: path.join('logs', 'app.log') }) // Log to a file
    ]
});

// Optional: create logs folder if it doesn't exist
const fs = require('fs');
const logDirectory = './logs';
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

module.exports = logger;
