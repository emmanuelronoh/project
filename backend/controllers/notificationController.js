// controllers/notificationController.js

const Notification = require('../models/notificationModel');

// Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a notification
exports.createNotification = async (req, res) => {
  const { message } = req.body;
  try {
    const newNotification = new Notification({
      user: req.user.id,
      message,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Notification = require('../models/notificationModel');

exports.createNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = new Notification({ user: userId, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
