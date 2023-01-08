const configs = {
  mongoDbUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  jwtSecretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  basicAuthName: process.env.BASIC_AUTH_USERNAME,
  basicAuthPass: process.env.BASIC_AUTH_PASSWORD
};

module.exports = configs;
