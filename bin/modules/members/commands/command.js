const db = require('../../../app/helpers/databases/mongodb/db');

const insertOneMember = async (docs) => {
  return db.insertOne({ collection: 'members' }, docs);
};

const updateOneMember = async (memberId, docs) => {
  return db.updateOne({ collection: 'members' }, { memberId }, docs);
};

const deleteOneMember = async (memberId) => {
  return db.deleteOne({ collection: 'members' }, { memberId });
};

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
