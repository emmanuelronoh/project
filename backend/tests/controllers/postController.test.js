// tests/controllers/postController.test.js

const request = require('supertest');
const app = require('../../server');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
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

describe('Post Controller', () => {
  let postId;

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Post', content: 'This is a test post' });

    postId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'New Post');
  });

  it('should fetch posts by user ID', async () => {
    const res = await request(app)
      .get(`/api/posts/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Post' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Post');
  });

  it('should delete a post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('msg', 'Post deleted successfully');
  });
});
