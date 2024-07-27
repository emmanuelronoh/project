// services/userService.js

const User = require('../models/userModel');

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Update user details
const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { getUserById, updateUser };
