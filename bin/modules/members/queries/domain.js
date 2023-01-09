const query = require('./query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const minio = require('../../../app/helpers/utils/minio');

const getAllMembers = async (payload) => {
  const { page, size, search, sortBy, order } = payload;
  const members = await query.findPaginatedMembers({ search, page, size, sortBy, order });

  members.result = await Promise.all(members.result.map(async member => {
    if (member.profilePic) {
      member.profilePic = await minio.objectGetUrl({ bucketName: 'members', objectName: member.profilePic });
    }
    return member;
  }));
  return members;
};

const getOneMember = async (payload) => {
  const member = await query.findOneMember({ memberId: payload.memberId });
  if (!member) {
    throw new UnprocessableEntityError(`No member found with id of "${payload.memberId}"`);
  }
  member.profilePic = await minio.objectGetUrl({ bucketName: 'members', objectName: member.profilePic });
  return member;
};

module.exports = {
  getAllMembers,
  getOneMember
};
