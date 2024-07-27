// tests/controllers/userController.test.js

const request = require('supertest');
const app = require('../../server');
const User = require('../../models/userModel');
const { connectDB, disconnectDB } = require('../../config/dbConfig');

let token;

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
});

afterAll(async () => {
  await disconnectDB();
});

describe('User Controller', () => {
  let userId;

  it('should fetch user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    userId = res.body._id;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('email');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updateduser' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });
});
