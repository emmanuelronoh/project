// tests/controllers/mediaController.test.js

const request = require('supertest');
const app = require('../../server');
const { connectDB, disconnectDB } = require('../../config/dbConfig');
const fs = require('fs');
const path = require('path');

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

describe('Media Controller', () => {
  it('should upload media', async () => {
    const filePath = path.join(__dirname, 'test-image.jpg'); // Adjust path as needed

    const res = await request(app)
      .post('/api/media/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('url');
  });

  it('should get media', async () => {
    const publicId = 'your_public_id'; // Replace with a valid public ID

    const res = await request(app)
      .get(`/api/media/${publicId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('public_id');
  });
});
