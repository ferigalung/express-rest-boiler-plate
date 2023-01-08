const domain = require('./domain');
const commandModel = require('./command_model');
const validate = require('../../../app/helpers/utils/validate');
const wrapper = require('../../../app/helpers/utils/wrapper');
const logger = require('../../../app/helpers/utils/logger');
const ctx = 'users::commands::handler';

const postLoginUser = async (req, res, next) => {
  const { error, value } = validate(commandModel.loginUser, req.body);
  if (error) { return next(error); }

  try {
    const result = await domain.loginUser(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully start a new session' }));
  } catch (err) {
    logger.error(err, ctx, 'postLoginUser');
    next(err);
  }
};

const postRegisterUser = async (req, res, next) => {
  const { error, value } = validate(commandModel.registerUser, req.body);
  if (error) { return next(error); }

  try {
    const result = await domain.registerUser(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully register new user' }));
  } catch (err) {
    logger.error(err, ctx, 'postRegisterUser');
    next(err);
  }
};

module.exports = {
  postLoginUser,
  postRegisterUser
};
