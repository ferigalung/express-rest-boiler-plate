const jose = require('jose');
const { jwtSecretKey } = require('../../configs/global_config');
const { InternalServerError, UnauthorizedError } = require('../errors');
const logger = require('../utils/logger');

const verifyJwt = async (req, res, next) => {
  // Extract the JWT from the Authorization header
  const authorizationHeader = req.headers.authorization;
  const jwt = authorizationHeader?.split(' ')[1] || '';

  // Verify the JWT using the JWT.verify() method
  try {
    const decodedJwt = await jose.jwtVerify(jwt, jwtSecretKey);
    // If the JWT is valid, add the decoded JWT payload to the request object
    if (decodedJwt) {
      req.user = decodedJwt;
    } else {
      // If the JWT is invalid, return a 401 Unauthorized response
      throw new UnauthorizedError('Invalid or expired token!');
    }
  } catch (err) {
    logger.error(err, 'jwtAuth', 'verifyJwt');
    if (err.code === 401) {
      next(err);
    }
    next(new InternalServerError('Failed to verify jwt'));
  }

  // Call the next middleware function
  next();
};

module.exports = {
  verifyJwt
};
