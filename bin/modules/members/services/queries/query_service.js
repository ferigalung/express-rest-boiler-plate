const query = require('./query');
const logger = require('../../../../app/helpers/utils/logger');
const ctx = 'members::query_service';
const { InternalServerError, UnprocessableEntityError } = require('../../../../app/helpers/errors');

const getAllMembers = async () => {
  const members = await query.findManyMembers({})
    .catch(err => {
      logger.error(err, ctx, 'getAllMembers::findManyMembers');
      throw new InternalServerError();
    });

  const mappedMember = members.map(item => {
    delete item._id;
    return item;
  });
  return mappedMember;
};

const getOneMember = async (payload) => {
  const member = await query.findOneMember({ memberId: payload.memberId }).catch(err => {
    logger.error(err, ctx, 'getOneMember::findOneMember');
    throw new InternalServerError();
  });
  if (!member) {
    throw new UnprocessableEntityError(`No member found with id of "${payload.memberId}"`);
  }

  delete member._id;
  return member;
};

module.exports = {
  getAllMembers,
  getOneMember
};
