const configs = {
  mongoDbUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  jwtSecretKey: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  basicAuthConfig: {
    name: process.env.BASIC_AUTH_USERNAME,
    pass: process.env.BASIC_AUTH_PASSWORD
  },
  minioConfig: {
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT) : 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
  }
};

module.exports = configs;
