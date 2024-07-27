// tests/controllers/chatController.test.js

const request = require('supertest');
const app = require('../../server');
const User = require('../../models/userModel');
const Chat = require('../../models/chatModel');
const { connectDB, disconnectDB } = require('../../config/dbConfig');

let token1, token2;
let userId1, userId2;

beforeAll(async () => {
  await connectDB();

  // Create two users and authenticate to get tokens
  const user1Res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123'
    });
  
  const user2Res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'user2',
      email: 'user2@example.com',
      password: 'password123'
    });

  const login1Res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user1@example.com', password: 'password123' });
  
  const login2Res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user2@example.com', password: 'password123' });

  token1 = login1Res.body.token;
  token2 = login2Res.body.token;
  userId1 = user1Res.body._id;
  userId2 = user2Res.body._id;
});

afterAll(async () => {
  await disconnectDB();
});

describe('Chat Controller', () => {
  let chatId;

  it('should send a message', async () => {
    const res = await request(app)
      .post('/api/chats')
      .set('Authorization', `Bearer ${token1}`)
      .send({ receiverId: userId2, message: 'Hello there!' });

    chatId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Hello there!');
  });

  it('should get chat history', async () => {
    const res = await request(app)
      .get(`/api/chats/history/${userId1}/${userId2}`)
      .set('Authorization', `Bearer ${token1}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
