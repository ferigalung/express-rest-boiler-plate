const Joi = require('joi');

const loginUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const registerUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({ 'any.only': 'confirmPassword did not match with password' })
});

module.exports = {
  loginUser,
  registerUser
};
