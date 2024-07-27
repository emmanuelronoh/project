// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getNotifications } = require('../controllers/notificationController');

// Get user notifications
router.get('/', authMiddleware, getNotifications);

module.exports = router;
