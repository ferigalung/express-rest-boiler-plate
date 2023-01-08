const domain = require('./domain');
const queryModel = require('./query_model');
const validate = require('../../../app/helpers/utils/validate');
const logger = require('../../../app/helpers/utils/logger');
const wrapper = require('../../../app/helpers/utils/wrapper');
const ctx = 'members::queries::handler';

const getAllMembers = async (req, res, next) => {
  const { error, value } = validate(queryModel.getAllMembers, req.query);
  if (error) { return next(error); }

  try {
    const members = await domain.getAllMembers(value);
    res.json(wrapper.success({ data: members.result, meta: members.meta, msg: 'Successfully get members' }));
  } catch (err) {
    logger.error(err, ctx, 'getAllMember');
    next(err);
  }
};

const getOneMember = async (req, res, next) => {
  const { error, value } = validate(queryModel.getOneMember, req.params);
  if (error) { return next(error); }

  try {
    const result = await domain.getOneMember(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully get members' }));
  } catch (err) {
    logger.error(err, ctx, 'getOneMember');
    next(err);
  }
};

module.exports = {
  getAllMembers,
  getOneMember
};
