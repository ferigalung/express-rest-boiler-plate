const query = require('./query');
const logger = require('../../../../app/helpers/utils/logger');
const ctx = 'members::query_service';

const getAllMembers = async () => {
  const members = await query.findManyMembers({}).catch(err => {
    logger.error(err, ctx, 'getAllMembers::findManyMembers');
    throw err;
  });
  const mappedMember = members.map(item => {
    delete item.id;
    return item;
  });
  return mappedMember;
};

const getOneMember = async (payload) => {
  return await query.findOneMember({ memberId: payload.memberId }).catch(err => {
    logger.error(err, ctx, 'getOneMember::findOneMember');
    throw err;
  });
};

module.exports = {
  getAllMembers,
  getOneMember
};
