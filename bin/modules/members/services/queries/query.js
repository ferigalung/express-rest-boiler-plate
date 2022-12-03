const db = require('../../../../app/helpers/databases/mongodb/db');

const findManyMembers = async (params) => {
  return db.findMany({ collection: 'members' }, params);
};

const findOneMember = async (params) => {
  return db.findOne({ collection: 'members' }, params);
};

module.exports = {
  findManyMembers,
  findOneMember
};
