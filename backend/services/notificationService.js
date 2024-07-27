// services/notificationService.js

const Notification = require('../models/notificationModel');
const User = require('../models/userModel');

// Create a notification
const createNotification = async (userId, notificationData) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const notification = new Notification({
      user: userId,
      ...notificationData,
    });

    await notification.save();
    return notification;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get notifications for a user
const getNotificationsByUserId = async (userId) => {
  try {
    const notifications = await Notification.find({ user: userId });
    return notifications;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createNotification, getNotificationsByUserId };
