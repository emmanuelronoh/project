// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Logout a user
router.post('/logout', authenticate, logout);

// Get user profile (authentication required)
router.get('/profile', authenticate, getProfile);

module.exports = router;
