const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Verify OTP Route
router.post('/verify-otp', authController.verifyOTP);

// Logout Route
router.get('/logout', authController.logout);

module.exports = router;