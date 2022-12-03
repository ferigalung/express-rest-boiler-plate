const queryService = require('../services/queries/query_service');
const commandService = require('../services/commands/command_service');
const wrapper = require('../../../app/helpers/utils/wrapper');
const commandModel = require('../../members/services/commands/command_model');
const queryModel = require('../../members/services/queries/query_model');
const validate = require('../../../app/helpers/utils/validate');
const { unknownError } = require('../../../app/helpers/utils/common');

const getAllMembers = async (req, res) => {
  try {
    const members = await queryService.getAllMembers();
    res.json(wrapper('success to get data', members));
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err);
    }
    return res.status(500).json(unknownError);
  }
};

const getOneMember = async (req, res) => {
  const { error, value } = validate(queryModel.getOneMember, req.params);
  if (error) { return res.status(error.code).json(error); }

  try {
    const result = await queryService.getOneMember(value);
    return res.json(wrapper('Successfully get member', result));
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err);
    }
    return res.status(500).json(unknownError);
  }
};

const postInsertOneMember = async (req, res) => {
  const { error, value } = validate(commandModel.insertOneMember, req.body);
  if (error) { return res.status(error.code).json(error); }

  try {
    const member = await commandService.insertOneMember(value);
    res.json(wrapper('successfully insert data', member));
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err);
    }
    return res.status(500).json(unknownError);
  }
};

const putUpdateOneMember = async (req, res) => {
  const { error, value } = validate(commandModel.updateOneMember, {
    ...req.body,
    memberId: req.params.memberId
  });
  if (error) { return res.status(error.code).json(error); }

  try {
    const member = await commandService.updateOneMember(value);
    res.json(wrapper('success to update data', member));
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err);
    }
    return res.status(500).json(unknownError);
  }
};

const deleteOneMember = async (req, res) => {
  const { error, value } = validate(commandModel.deleteOneMember, req.params);
  if (error) { return res.status(error.code).json(error); }

  try {
    const member = await commandService.deleteOneMember(value);
    res.json(wrapper('success to delete data', member));
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err);
    }
    return res.status(500).json(unknownError);
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  postInsertOneMember,
  putUpdateOneMember,
  deleteOneMember
};
