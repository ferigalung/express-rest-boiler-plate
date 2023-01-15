const { v4: uuidv4 } = require('uuid');
const command = require('./command');
const query = require('../queries/query');
const { UnprocessableEntityError } = require('../../../app/helpers/errors');
const { isEmpty } = require('lodash');
const minio = require('../../../app/helpers/utils/minio');
const path = require('path');

const uploadProfilePic = async (profilePic, memberId) => {
  const filename = `profilePic-${memberId}${path.extname(profilePic.originalname)}`;
  await minio.bufferObjectUpload({
    objectName: filename,
    buffer: profilePic.buffer,
    meta: { 'Content-Type': profilePic.mimetype }
  });
  return filename;
};

const insertOneMember = async (payload) => {
  const { name, email, age, memberType, profilePic } = payload;
  const memberId = uuidv4();
  let filename = null;
  let profilePicUrl;
  if (profilePic) {
    filename = await uploadProfilePic(profilePic, memberId);
    profilePicUrl = await minio.objectGetUrl({
      objectName: filename
    });
  }

  const insert = await command.insertOneMember({
    memberId,
    name,
    email,
    age,
    memberType,
    profilePic: filename
  });

  delete insert._id;
  return {
    ...insert,
    profilePic: profilePicUrl || null
  };
};

const checkMember = async (memberId) => {
  const member = await query.findOneMember({ memberId });
  if (isEmpty(member)) { throw new UnprocessableEntityError(`There's no member with id of ${memberId}`); };
  return member;
};

const updateOneMember = async (payload) => {
  const member = await checkMember(payload.memberId);
  let filename = member.profilePic;
  if (payload.profilePic) {
    filename = await uploadProfilePic(payload.profilePic, payload.memberId);
  }

  const updateOne = await command.updateOneMember(payload.memberId, {
    name: payload.name,
    email: payload.email,
    age: payload.age,
    memberType: payload.memberType,
    profilePic: filename
  });

  const profilePicUrl = await minio.objectGetUrl({
    objectName: filename
  });
  delete updateOne._id;
  return {
    ...updateOne,
    profilePic: profilePicUrl
  };
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
