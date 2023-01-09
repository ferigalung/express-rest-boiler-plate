const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const argon2 = require('argon2');
const { jwtSecretKey } = require('../../../app/configs/global_config');
const { SignJWT } = require('jose');

const registerUser = async (payload) => {
  const { username, password } = payload;

  const existUser = await query.findOneUser({ username });
  if (existUser) {
    throw new UnprocessableEntityError('Username already taken!');
  }

  const hashedPassword = await argon2.hash(password);
  const now = new Date();
  const insert = await command.insertOneUser({
    userId: uuidv4(),
    username,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  });

  delete insert._id;
  delete insert.password;
  return insert;
};

const loginUser = async (payload) => {
  const { username, password } = payload;

  const unauthorizedError = new UnprocessableEntityError('Invalid username or password!');
  const user = await query.findOneUser({ username });
  if (!user) {
    throw unauthorizedError;
  }

  const verifyPassword = await argon2.verify(user.password, password);
  if (!verifyPassword) {
    throw unauthorizedError;
  }

  const token = await new SignJWT({ id: user.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(jwtSecretKey);

  return {
    userId: user.userId,
    username: user.username,
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};
