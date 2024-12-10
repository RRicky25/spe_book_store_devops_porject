const express = require('express');
const logger = require("../../logger"); // Import the logger
const { createAOrder, getOrderByEmail } = require('./order.controller');

const router = express.Router();

// Log when the router is loaded
logger.info("Order routes initialized.");

router.post("/", (req, res, next) => {
    logger.info("POST / create order requrested");
    next();
}, createAOrder);

router.get("/email/:email", (req, res, next) => {
    logger.info("GET / Order by email requested");
    next();
}, getOrderByEmail);

module.exports = router;

// // create order endpoint
// router.post("/", createAOrder);

// // get orders by user email 
// router.get("/email/:email", getOrderByEmail);