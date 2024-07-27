// config/jwtConfig.js

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: '1d', // Token expiration time
  };
  