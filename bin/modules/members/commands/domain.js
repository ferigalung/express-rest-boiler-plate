const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const { isEmpty } = require('lodash');

const insertOneMember = async (payload) => {
  const insert = await command.insertOneMember({
    memberId: uuidv4(),
    ...payload
  });

  delete insert._id;
  return insert;
};

const checkMember = async (memberId) => {
  const member = await query.findOneMember({ memberId });
  if (isEmpty(member)) { throw new UnprocessableEntityError(`There's no member with id of ${memberId}`); };
};

const updateOneMember = async (payload) => {
  await checkMember(payload.memberId);

  const updateOne = await command.updateOneMember(payload.memberId, {
    name: payload.name,
    email: payload.email,
    age: payload.age,
    memberType: payload.memberType
  });

  delete updateOne._id;
  return updateOne;
};

const deleteOneMember = async (payload) => {
  await checkMember(payload.memberId);
  await command.deleteOneMember(payload.memberId);
  return payload;
};

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
