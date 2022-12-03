const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const logger = require('../../../../app/helpers/utils/logger');
const ctx = 'members::query_service';
const { InternalServerError, UnprocessableEntityError } = require('../../../../app/helpers/errors');
const { isEmpty } = require('lodash');

const insertOneMember = async (payload) => {
  const insert = await command.insertOneMember({
    memberId: uuidv4(),
    ...payload
  }).catch(err => {
    logger.error(err, ctx, 'insertOneMember::command.insertOneMember');
    throw new InternalServerError();
  });

  delete insert._id;
  return insert;
};

const checkMember = async (memberId) => {
  const member = await query.findOneMember({ memberId }).catch(err => {
    logger.error(err, ctx, 'updateOneMember::query.findOneMember');
    throw new InternalServerError();
  });
  if (isEmpty(member)) { throw new UnprocessableEntityError(`There's no member with id of ${memberId}`); };
};

const updateOneMember = async (payload) => {
  await checkMember(payload.memberId);

  const updateOne = await command.updateOneMember(payload.memberId, {
    name: payload.name,
    email: payload.email,
    age: payload.age,
    memberType: payload.memberType
  }).catch(err => {
    logger.error(err, ctx, 'updateOneMember::command.updateOneMember');
    throw new InternalServerError();
  });

  delete updateOne._id;
  return updateOne;
};

const deleteOneMember = async (payload) => {
  await checkMember(payload.memberId);

  await command.deleteOneMember(payload.memberId).catch(err => {
    logger.error(err, ctx, 'deleteOneMember::command.deleteOneMember');
    throw new InternalServerError();
  });

  return payload;
};

module.exports = {
  insertOneMember,
  updateOneMember,
  deleteOneMember
};
