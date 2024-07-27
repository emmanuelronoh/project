// services/postService.js

const Post = require('../models/postModel');
const User = require('../models/userModel');

// Create a new post
const createPost = async (userId, postData) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const post = new Post({
      user: userId,
      ...postData,
    });

    await post.save();
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get posts by user ID
const getPostsByUserId = async (userId) => {
  try {
    const posts = await Post.find({ user: userId }).populate('user', 'username');
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Update a post
const updatePost = async (postId, postData) => {
  try {
    const post = await Post.findByIdAndUpdate(postId, postData, { new: true });
    if (!post) throw new Error('Post not found');
    return post;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Delete a post
const deletePost = async (postId) => {
  try {
    await Post.findByIdAndDelete(postId);
    return { msg: 'Post deleted successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createPost, getPostsByUserId, updatePost, deletePost };
