const Joi = require('joi');

const member = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().positive().max(150).required(),
  memberType: Joi.string().valid('basic', 'ultimate').default('basic'),
  profilePic: Joi.object({
    mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/JPEG').required()
  }).unknown().optional()
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
