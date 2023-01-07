const configs = {
  mongoDbUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  jwtSecretKey: process.env.JWT_SECRET_KEY
};

module.exports = configs;
