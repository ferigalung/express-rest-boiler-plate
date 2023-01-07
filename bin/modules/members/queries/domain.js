const query = require('./query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');

const getAllMembers = async (payload) => {
  const { page, size, search, sortBy, order } = payload;
  return query.findPaginatedMembers({ search, page, size, sortBy, order });
};

const getOneMember = async (payload) => {
  const member = await query.findOneMember({ memberId: payload.memberId });
  if (!member) {
    throw new UnprocessableEntityError(`No member found with id of "${payload.memberId}"`);
  }
  return member;
};

module.exports = {
  getAllMembers,
  getOneMember
};
