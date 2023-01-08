const db = require('../../../app/helpers/databases/mongodb/db');

const insertOneUser = async (docs) => {
  return db.insertOne({ collection: 'users' }, docs);
};

module.exports = {
  insertOneUser
};
