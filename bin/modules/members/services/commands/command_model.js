const Joi = require('joi');

const member = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().positive().max(150).required(),
  memberType: Joi.string().valid('basic', 'ultimate').default('basic')
};
const insertOneMember = Joi.object(member);

const updateOneMember = Joi.object({
  ...member,
  memberId: Joi.string().guid({ version: 'uuidv4' }).required(),
  memberType: Joi.string().valid('basic', 'ultimate').required()
});

const deleteOneMember = Joi.object({
  memberId: Joi.string().guid({ version: 'uuidv4' }).required()
});

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
