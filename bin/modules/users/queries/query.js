const db = require('../../../app/helpers/databases/mongodb/db');

const findOneUser = async (params) => {
  return db.findOne({ collection: 'users' }, { params, projects: { _id: 0 } });
};

module.exports = {
  findOneUser
};
