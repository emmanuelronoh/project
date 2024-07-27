const authService = require('../../services/authService');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

describe('Auth Service', () => {
  it('should hash a password', async () => {
    const password = 'password123';
    const hashedPassword = await authService.hashPassword(password);
    expect(hashedPassword).not.toBe(password);
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });

  it('should compare a password', async () => {
    const password = 'password123';
    const hashedPassword = await authService.hashPassword(password);
    const isMatch = await authService.comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
