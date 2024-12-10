const express = require('express');
const logger = require("../../logger"); // Import the logger
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY

// Log when the router is loaded
logger.info("User routes initialized.");

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            logger.error(`POST /admin - not found`);
            res.status(404).send({ message: "Admin not found!" })
        }
        if (admin.password !== password) {
            logger.error(`POST /admin - invalid password.`);
            res.status(401).send({ message: "Invalid password!" })
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        )

        logger.info(`POST /admin - authentication successfull.`);
        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })

    } catch (error) {
        console.error("Failed to login as admin", error)
        logger.error(`POST /admin - failed to login as admin.`);
        res.status(401).send({ message: "Failed to login as admin" })
    }
})

module.exports = router;