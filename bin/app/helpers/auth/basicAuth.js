const auth = require('basic-auth');
const { UnauthorizedError } = require('../errors');
const compare = require('tsscmp');
const { basicAuthName, basicAuthPass } = require('../../configs/global_config');

const basicAuth = (req, res, next) => {
  const credential = auth(req);
  if (!credential || !check(credential)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="user"');
    return next(new UnauthorizedError('Unauthorized Error!'));
  }
  next();
};

const check = (credential) => {
  if (compare(credential.name, basicAuthName) && compare(credential.pass, basicAuthPass)) {
    return true;
  }
  return false;
};

module.exports = basicAuth;
