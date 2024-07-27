// // routes/userRoutes.js

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.get('/profile', authMiddleware, userController.getUserProfile);
// router.put('/profile', authMiddleware, userController.updateUserProfile);

// module.exports = router;
// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/userController');
const { validateUser } = require('../middleware/validationMiddleware');

// Get user profile
router.get('/profile', authMiddleware, getProfile);

// Update user profile
router.put('/profile', authMiddleware, validateUser, updateProfile);

// Change password
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
