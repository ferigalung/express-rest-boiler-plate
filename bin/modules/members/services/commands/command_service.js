const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const logger = require('../../../../app/helpers/utils/logger');
const ctx = 'members::query_service';

const insertOneMember = async (payload) => {
  const insert = await command.insertOneMember({
    memberId: uuidv4(),
    ...payload
  }).catch(err => {
    logger.error(err, ctx, 'insertOneMember::command.insertOneMember');
    throw err;
  });

  delete insert._id;
  return insert;
};

const updateOneMember = async (payload) => {
  const updateOne = await command.updateOneMember(payload.memberId, {
    ...payload.name && { name: payload.name },
    ...payload.age && { age: payload.age },
    ...payload.sex && { sex: payload.sex },
    ...payload.memberType && { memberType: payload.memberType }
  }).catch(err => {
    logger.error(err, ctx, 'updateOneMember::command.updateOneMember');
    throw err;
  });

  delete updateOne._id;
  return updateOne;
};

const deleteOneMember = async (payload) => {
  await command.deleteOneMember(payload.memberId).catch(err => {
    logger.error(err, ctx, 'deleteOneMember::command.deleteOneMember');
    throw err;
  });

  return payload;
};

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
