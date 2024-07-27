const request = require('supertest');
const app = require('../../server'); // Adjust path as needed
const User = require('../../models/userModel');

beforeAll(async () => {
  await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  });
});

describe('User Routes', () => {
  it('should get a user profile', async () => {
    const user = await User.findOne({ email: 'testuser@example.com' });

    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should update a user profile', async () => {
    const user = await User.findOne({ email: 'testuser@example.com' });

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ bio: 'Updated bio' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('bio', 'Updated bio');
  });
});
