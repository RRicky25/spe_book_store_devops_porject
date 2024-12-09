const express = require('express');
const logger = require("../../logger"); // Import the logger
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// Log when the router is loaded
logger.info("Book routes initialized.");

// POST a book
router.post("/create-book", verifyAdminToken, (req, res, next) => {
    logger.info(`POST /create-book - Request received. Body: ${JSON.stringify(req.body)}`);
    next();
}, postABook);

// GET all books
router.get("/", (req, res, next) => {
    logger.info("GET / - Fetch all books requested.");
    next();
}, getAllBooks);

// GET a single book
router.get("/:id", (req, res, next) => {
    logger.info(`GET /${req.params.id} - Fetch single book requested.`);
    next();
}, getSingleBook);

// PUT (Update) a book
router.put("/edit/:id", verifyAdminToken, (req, res, next) => {
    logger.info(`PUT /edit/${req.params.id} - Update book requested. Body: ${JSON.stringify(req.body)}`);
    next();
}, UpdateBook);

// DELETE a book
router.delete("/:id", verifyAdminToken, (req, res, next) => {
    logger.info(`DELETE /${req.params.id} - Delete book requested.`);
    next();
}, deleteABook);

module.exports = router;
