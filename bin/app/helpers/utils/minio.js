const Minio = require('minio');
const { minioConfig } = require('../../configs/global_config');
const { InternalServerError } = require('../errors');
const logger = require('../utils/logger');
let minioClient;
const ctx = 'minio';

const init = () => {
  try {
    minioClient = new Minio.Client(minioConfig);
    bucketCreate('members');
    logger.info('minio initialized', ctx, 'minio-init');
  } catch (err) {
    logger.error(err, ctx, 'minio-init');
  }
};

const isBucketExists = async (bucketName) => {
  try {
    return minioClient.bucketExists(bucketName);
  } catch (err) {
    logger.error(err, ctx, 'isBucketExists');
    throw new InternalServerError(err.message);
  }
};

const bucketCreate = async (bucketName, region = 'us-east-1') => {
  try {
    const isExists = await isBucketExists(bucketName);
    if (isExists) {
      return true;
    }
    await minioClient.makeBucket(bucketName, region);
    return true;
  } catch (err) {
    logger.error(err, ctx, 'bucketCreate');
    throw new InternalServerError(err.message);
  }
};

const bucketRemove = async (bucketName, region = 'us-east-1') => {
  try {
    await minioClient.removeBucket(bucketName, region);
    return true;
  } catch (err) {
    logger.error(err, ctx, 'bucketRemove');
    throw new InternalServerError(err.message);
  }
};

const objectUpload = async ({ bucketName, objectName, filePath, meta }) => {
  try {
    return minioClient.fPutObject(bucketName, objectName, filePath, meta);
  } catch (err) {
    logger.error(err, ctx, 'objectUpload');
    throw new InternalServerError(err.message);
  }
};

const bufferObjectUpload = async ({ bucketName, objectName, buffer, meta }) => {
  try {
    return minioClient.putObject(bucketName, objectName, buffer, meta);
  } catch (err) {
    logger.error(err, ctx, 'bufferObjectUpload');
    throw new InternalServerError(err.message);
  }
};

const objectDownload = async ({ bucketName, objectName, filePath }) => {
  try {
    return minioClient.fGetObject(bucketName, objectName, filePath);
  } catch (err) {
    logger.error(err, ctx, 'objectDownload');
    throw new InternalServerError(err.message);
  }
};

const objectRemove = async (bucketName, objectName) => {
  try {
    await minioClient.removeObject(bucketName, objectName);
    return true;
  } catch (err) {
    logger.error(err, ctx, 'objectRemove');
    throw new InternalServerError(err.message);
  }
};

const objectGetUrl = async ({ bucketName, objectName, expiry = 604800 }) => {
  try {
    return minioClient.presignedGetObject(bucketName, objectName, expiry);
  } catch (err) {
    logger.error(err, ctx, 'objectGetUrl');
    throw new InternalServerError(err.message);
  }
};

module.exports = {
  init,
  isBucketExists,
  bucketCreate,
  bucketRemove,
  objectUpload,
  objectDownload,
  objectRemove,
  objectGetUrl,
  bufferObjectUpload
};
