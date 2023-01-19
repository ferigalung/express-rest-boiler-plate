const Minio = require('minio');
const { minioConfig } = require('../../configs/global_config');
const { InternalServerError } = require('../errors');
const logger = require('../utils/logger');
let minioClient;
const ctx = 'minio';

const init = () => {
  try {
    minioClient = new Minio.Client(minioConfig);
    bucketCreate(minioConfig.bucketName, true);
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

const bucketCreate = async (bucketName, isPublic = false, region = 'us-east-1') => {
  try {
    const isExists = await isBucketExists(bucketName);
    if (isExists) {
      return true;
    }
    await minioClient.makeBucket(bucketName, region);

    if (isPublic === true) {
      const policy = `{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${bucketName}/*"
            ]
          }
        ]
      }`;
      await minioClient.setBucketPolicy(bucketName, policy);
    }

    return true;
  } catch (err) {
    logger.error(err, ctx, 'bucketCreate');
    throw new InternalServerError(err.message);
  }
};

const bucketRemove = async (bucketName = minioConfig.bucketName, region = 'us-east-1') => {
  try {
    await minioClient.removeBucket(bucketName, region);
    return true;
  } catch (err) {
    logger.error(err, ctx, 'bucketRemove');
    throw new InternalServerError(err.message);
  }
};

const objectUpload = async ({ bucketName = minioConfig.bucketName, objectName, filePath, meta }) => {
  try {
    return minioClient.fPutObject(bucketName, objectName, filePath, meta);
  } catch (err) {
    logger.error(err, ctx, 'objectUpload');
    throw new InternalServerError(err.message);
  }
};

const bufferObjectUpload = async ({ bucketName = minioConfig.bucketName, objectName, buffer, meta }) => {
  try {
    await minioClient.putObject(bucketName, objectName, buffer, meta);
    return objectName;
  } catch (err) {
    logger.error(err, ctx, 'bufferObjectUpload');
    throw new InternalServerError(err.message);
  }
};

const objectDownload = async ({ bucketName = minioConfig.bucketName, objectName, filePath }) => {
  try {
    return minioClient.fGetObject(bucketName, objectName, filePath);
  } catch (err) {
    logger.error(err, ctx, 'objectDownload');
    throw new InternalServerError(err.message);
  }
};

const objectRemove = async ({ bucketName = minioConfig.bucketName, objectName }) => {
  try {
    await minioClient.removeObject(bucketName, objectName);
    return true;
  } catch (err) {
    logger.error(err, ctx, 'objectRemove');
    throw new InternalServerError(err.message);
  }
};

const objectGetUrl = async ({ bucketName = minioConfig.bucketName, objectName, expiry = 604800 }) => {
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
