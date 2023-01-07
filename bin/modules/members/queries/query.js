const db = require('../../../app/helpers/databases/mongodb/db');

const findManyMembers = async (params) => {
  return db.findMany({ collection: 'members' }, { params, projects: { _id: 0 } });
};

const findPaginatedMembers = async ({ search, page, size, sortBy, order }) => {
  return db.findPaginated({ collection: 'members' }, {
    params: {
      $or: [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    },
    page,
    size,
    projects: { _id: 0 },
    sortParams: { [sortBy]: order }
  });
};

const findOneMember = async (params) => {
  return db.findOne({ collection: 'members' }, { params, projects: { _id: 0 } });
};

module.exports = {
  findManyMembers,
  findOneMember,
  findPaginatedMembers
};
