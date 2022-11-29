const queryService = require('../services/queries/query_service');
const commandService = require('../services/commands/command_service');
const wrapper = require('../../../app/helpers/utils/wrapper');

const getAllMembers = async (req, res) => {
  try {
    const members = await queryService.getAllMembers();
    res.json(wrapper('success to get data', members));
  } catch (err) {
    res.status(500).json(wrapper('Fail to get all members', null, false));
  }
};

const getOneMember = async (req, res) => {
  const payload = {
    memberId: req.params.memberId
  };

  try {
    const member = await queryService.getOneMember(payload);
    if (!member) {
      return res.status(422).json(wrapper('no data found', member, false));
    }
    res.json(wrapper('success to get data', member));
  } catch (err) {
    res.status(500).json(wrapper('Fail to get one member', null, false));
  }
};

const postInsertOneMember = async (req, res) => {
  const payload = {
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    memberType: req.body.memberType
  };

  try {
    const member = await commandService.insertOneMember(payload);
    res.json(wrapper('success to insert data', member));
  } catch (err) {
    res.status(500).json(wrapper('Fail to insert one member', null, false));
  }
};

const putUpdateOneMember = async (req, res) => {
  const payload = {
    memberId: req.params.memberId,
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    memberType: req.body.memberType
  };

  try {
    const member = await commandService.updateOneMember(payload);
    res.json(wrapper('success to update data', member));
  } catch (err) {
    res.status(500).json(wrapper('Fail to update one member', null, false));
  }
};

const deleteOneMember = async (req, res) => {
  const payload = {
    memberId: req.params.memberId
  };

  try {
    const member = await commandService.deleteOneMember(payload);
    res.json(wrapper('success to delete data', member));
  } catch (err) {
    res.status(500).json(wrapper('Fail to delete one member', null, false));
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  postInsertOneMember,
  putUpdateOneMember,
  deleteOneMember
};
