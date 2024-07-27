const mongoose = require('mongoose');
const User = require('../../models/userModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/pidon-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('username', 'testuser');
    expect(user).toHaveProperty('email', 'testuser@example.com');
  });

  it('should validate required fields', async () => {
    try {
      await User.create({
        username: 'testuser',
        // Missing email and password
      });
    } catch (error) {
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });
});
