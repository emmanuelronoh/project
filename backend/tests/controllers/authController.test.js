// tests/controllers/authController.test.js

const request = require('supertest');
const app = require('../../server');
const User = require('../../models/userModel');
const { connectDB, disconnectDB } = require('../../config/dbConfig');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Auth Controller', () => {
  let testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('username', testUser.username);
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  it('should authenticate user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
