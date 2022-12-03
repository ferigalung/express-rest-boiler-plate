const { MongoClient } = require('mongodb');
const { mongoDbUrl, dbName } = require('../../../configs/global_config');
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

const findOne = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return await collection.findOne(params);
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'findOne');
    }
    throw error;
  }
};

const findMany = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return await collection.find(params).toArray();
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'findMany');
    }
    throw error;
  }
};

const insertOne = async (dbConfig, docs) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    await collection.insertOne(docs);
    return docs;
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'insertOne');
    }
    throw error;
  }
};

const updateOne = async (dbConfig, params, docs) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    await collection.updateOne(params, { $set: docs });
    return collection.findOne(params);
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'updateOne');
    }
    throw error;
  }
};

const deleteOne = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    const deleteOne = await collection.deleteOne(params);
    if (deleteOne.deletedCount === 0) {
      throw Error('No data affected');
    }
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'deleteOne');
    }
    throw error;
  }
};

module.exports = {
  connectToDb,
  getDb,
  findOne,
  findMany,
  insertOne,
  updateOne,
  deleteOne
};
