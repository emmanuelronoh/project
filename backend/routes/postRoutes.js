// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Create a post
router.post('/', authMiddleware, createPost);

// Get all posts
router.get('/', getPosts);

// Get a single post
router.get('/:id', getPost);

// Update a post
router.put('/:id', authMiddleware, updatePost);

// Delete a post
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
