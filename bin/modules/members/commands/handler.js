const domain = require('./domain');
const commandModel = require('./command_model');
const validate = require('../../../app/helpers/utils/validate');
const wrapper = require('../../../app/helpers/utils/wrapper');
const logger = require('../../../app/helpers/utils/logger');
const ctx = 'members::commands::handler';

const postInsertOneMember = async (req, res, next) => {
  const { error, value } = validate(commandModel.insertOneMember, req.body);
  if (error) { return next(error); }

  try {
    const result = await domain.insertOneMember(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully insert member' }));
  } catch (err) {
    logger.error(err, ctx, 'postInsertOneMember');
    next(err);
  }
};

const putUpdateOneMember = async (req, res, next) => {
  const { error, value } = validate(commandModel.updateOneMember, {
    ...req.body,
    memberId: req.params.memberId
  });
  if (error) { return next(error); }

  try {
    const result = await domain.updateOneMember(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully update member' }));
  } catch (err) {
    logger.error(err, ctx, 'putUpdateOneMember');
    next(err);
  }
};

const deleteOneMember = async (req, res, next) => {
  const { error, value } = validate(commandModel.deleteOneMember, req.params);
  if (error) { return next(error); }

  try {
    const result = await domain.deleteOneMember(value);
    res.json(wrapper.success({ data: result, msg: 'Successfully delete member' }));
  } catch (err) {
    logger.error(err, ctx, 'deleteOneMember');
    next(err);
  }
};

module.exports = {
  postInsertOneMember,
  putUpdateOneMember,
  deleteOneMember
};
