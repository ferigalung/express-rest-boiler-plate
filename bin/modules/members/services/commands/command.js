const db = require('../../../../app/helpers/databases/mongodb/db');

const insertOneMember = async (docs) => {
  return await db.insertOne({ collection: 'members' }, docs);
};

const updateOneMember = async (memberId, docs) => {
  return await db.updateOne({ collection: 'members' }, { memberId }, docs);
};

const deleteOneMember = async (memberId) => {
  return await db.deleteOne({ collection: 'members' }, { memberId });
};

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
