const jose = require('jose');
const { jwtSecretKey } = require('../../configs/global_config');
const { UnauthorizedError } = require('../errors');
const logger = require('../utils/logger');
const query = require('../../../modules/users/queries/query');

const verifyJwt = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const jwt = authorizationHeader?.split(' ')[1] || '';
  try {
    const decodedJwt = await jose.jwtVerify(jwt, jwtSecretKey);
    req.user = await query.findOneUser({ userId: decodedJwt.payload?.id });
    if (!req.user) {
      throw new UnauthorizedError('Unauthorized Error - user not found!');
    }
  } catch (err) {
    logger.error(err, 'jwtAuth', 'verifyJwt');
    res.setHeader('WWW-Authenticate', 'Bearer realm="admin"');
    if (typeof (err.code) !== 'number') {
      return next(new UnauthorizedError('Unauthorized Error - invalid or expired token!'));
    }
    return next(err);
  }

  next();
};

module.exports = {
  verifyJwt
};
