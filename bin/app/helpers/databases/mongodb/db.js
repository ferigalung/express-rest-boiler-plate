const { MongoClient } = require('mongodb');
const { mongoDbUrl, dbName } = require('../../../configs/global_config');
const { InternalServerError } = require('../../errors');
const mongoClient = new MongoClient(mongoDbUrl);
const logger = require('../../utils/logger');
const ctx = 'mongodb::db';

let dbConnection;
const connectToDb = (callback) => {
  mongoClient.connect()
    .then(client => {
      dbConnection = client;
      return callback();
    })
    .catch(err => {
      logger.error(err, ctx, 'connectTodb::MongoClient.connect');
      return callback(err);
    });
};

const getDb = () => dbConnection;

const findOne = async (dbConfig, { params = {}, projects = {} }) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return collection.findOne(params, { projection: projects });
  } catch (error) {
    logger.error(error, ctx, 'findOne');
    throw new InternalServerError(error.message, error);
  }
};

const findMany = async (dbConfig, { params, projects = {} }) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return collection.find(params).project(projects).toArray();
  } catch (error) {
    logger.error(error, ctx, 'findMany');
    throw new InternalServerError(error.message, error);
  }
};

const findPaginated = async (dbConfig, { params = {}, page, size, sortParams = {}, projects = {} }) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  const offset = ((page - 1) * size) || 0;
  try {
    const result = await collection.find(params).project(projects).sort(sortParams).skip(offset).limit(size).toArray();
    const count = await collection.count(params);
    const meta = {
      page,
      size,
      totalData: count || 0,
      totalPage: count > 0 ? Math.round(count / size) : 0,
      totalDataOnPage: result.length
    };
    return { result, meta };
  } catch (error) {
    logger.error(error, ctx, 'findPaginated');
    throw new InternalServerError(error.message, error);
  }
};

const insertOne = async (dbConfig, docs) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    await collection.insertOne(docs);
    return docs;
  } catch (error) {
    logger.error(error, ctx, 'insertOne');
    throw new InternalServerError(error.message, error);
  }
};

const insertMany = async (dbConfig, docs) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    await collection.insertMany(docs);
    return docs;
  } catch (error) {
    logger.error(error, ctx, 'insertMany');
    throw new InternalServerError(error.message, error);
  }
};

const updateOne = async (dbConfig, params, docs) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    await collection.updateOne(params, { $set: docs });
    return collection.findOne(params);
  } catch (error) {
    logger.error(error, ctx, 'updateOne');
    throw new InternalServerError(error.message, error);
  }
};

const deleteOne = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return collection.deleteOne(params);
  } catch (error) {
    logger.error(error, ctx, 'deleteOne');
    throw new InternalServerError(error.message, error);
  }
};

const deleteMany = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return collection.deleteMany(params);
  } catch (error) {
    logger.error(error, ctx, 'deleteMany');
    throw new InternalServerError(error.message, error);
  }
};

module.exports = {
  connectToDb,
  getDb,
  findOne,
  findMany,
  insertOne,
  updateOne,
  deleteOne,
  findPaginated,
  insertMany,
  deleteMany
};
