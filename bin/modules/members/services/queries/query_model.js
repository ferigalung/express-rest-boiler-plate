const Joi = require('joi');

const getOneMember = Joi.object({
  memberId: Joi.string().guid({ version: 'uuidv4' }).required()
});

module.exports = {
  getOneMember
};
