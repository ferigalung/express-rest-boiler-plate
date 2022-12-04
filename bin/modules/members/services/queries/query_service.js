const query = require('./query');
const logger = require('../../../../app/helpers/utils/logger');
const ctx = 'members::query_service';
const { InternalServerError, UnprocessableEntityError } = require('../../../../app/helpers/errors');

const getAllMembers = async (payload) => {
  const { page, size, search, sortBy, order } = payload;

  return query.findPaginatedMembers({ search, page, size, sortBy, order })
    .catch(err => {
      logger.error(err, ctx, 'getAllMembers::findManyMembers');
      throw new InternalServerError();
    });
};

const getOneMember = async (payload) => {
  const member = await query.findOneMember({ memberId: payload.memberId }).catch(err => {
    logger.error(err, ctx, 'getOneMember::findOneMember');
    throw new InternalServerError();
  });
  if (!member) {
    throw new UnprocessableEntityError(`No member found with id of "${payload.memberId}"`);
  }

  return member;
};

module.exports = {
  getAllMembers,
  getOneMember
};
