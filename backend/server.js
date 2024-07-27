// server.js

const express = require('express');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const { port } = require('./config/serverConfig');

// Initialize Express
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/media', mediaRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
