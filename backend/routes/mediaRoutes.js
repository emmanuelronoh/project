// routes/mediaRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage
const { uploadMedia } = require('../controllers/mediaController');

// Upload media
router.post('/upload', authMiddleware, upload.single('file'), uploadMedia);

module.exports = router;
