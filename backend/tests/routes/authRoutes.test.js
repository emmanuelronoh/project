// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.register);
// router.post('/login', authController.login);

// module.exports = router;

const request = require('supertest');
const app = require('../../server'); // Adjust path as needed

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
