const Joi = require('joi');

const getOneMember = Joi.object({
  memberId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const getAllMembers = Joi.object({
  page: Joi.number().integer().positive().required(),
  size: Joi.number().integer().positive().max(100).required(),
  search: Joi.string().optional().allow(null, ''),
  sortBy: Joi.string().valid('name', 'email', 'age', 'memberType').default('_id'),
  order: Joi.string().valid('desc', 'asc').default('desc')
});

module.exports = {
  getOneMember,
  getAllMembers
};
