// controllers/postController.js

const Post = require('../models/postModel');

// Create a post
exports.createPost = async (req, res) => {
  const { content, media } = req.body;
  try {
    const newPost = new Post({
      user: req.user.id,
      content,
      media,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get posts by user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).populate('user', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.createPost = async (req, res) => {
    const { userId, content, mediaUrl } = req.body;

    try {
        const post = new Post({ user: userId, content, mediaUrl });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
