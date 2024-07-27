// tests/controllers/notificationController.test.js

const request = require('supertest');
const app = require('../../server');
const User = require('../../models/userModel');
const Notification = require('../../models/notificationModel');
const { connectDB, disconnectDB } = require('../../config/dbConfig');

let token;
let userId;

beforeAll(async () => {
  await connectDB();

  // Create a user and authenticate to get a token
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'password123' });

  token = loginRes.body.token;
  userId = res.body._id;
});

afterAll(async () => {
  await disconnectDB();
});

describe('Notification Controller', () => {
  let notificationId;

  it('should create a notification', async () => {
    const res = await request(app)
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'info', message: 'New message received' });

    notificationId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'New message received');
  });

  it('should get notifications for a user', async () => {
    const res = await request(app)
      .get(`/api/notifications/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
