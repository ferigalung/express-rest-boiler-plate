const queryService = require('../services/queries/query_service');
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
  try {
    const payload = {
      memberId: req.params.id
    };
    const member = await queryService.getOneMember(payload);
    if (!member) {
      return res.status(422).json(wrapper(null, member, 'no data found'));
    }
    res.json(wrapper(null, member, 'success to get data'));
  } catch (err) {
    res.status(500).json(wrapper('Fail to get one member', null, false));
  }
};

module.exports = {
  getAllMembers,
  getOneMember
};
