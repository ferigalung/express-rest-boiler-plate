const db = require('../../../../app/helpers/databases/mongodb/db');

const findManyMembers = async (params) => {
  return await db.findMany({ collection: 'members' }, params);
};

const findOneMember = async (params) => {
  return await db.findOne({ collection: 'members' }, params);
};

module.exports = {
  findManyMembers,
  findOneMember
};
