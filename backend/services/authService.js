// services/authService.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

// Register new user
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) throw new Error('User already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Authenticate user and get token
const authenticateUser = async (email, password) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Generate JWT token
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { registerUser, authenticateUser };
