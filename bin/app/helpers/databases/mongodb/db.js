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
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'findOne'); // special case for some reason
    }
    throw error; // still want to crash
  }
};

const findMany = async (dbConfig, params) => {
  const db = dbConnection.db(dbConfig.dbName || dbName);
  const collection = db.collection(dbConfig.collection);
  try {
    return await collection.find(params).toArray();
  } catch (error) {
    if (error) {
      logger.error(`MongoDB error with error msg: ${error}`, ctx, 'findMany'); // special case for some reason
    }
    throw error; // still want to crash
  }
};

module.exports = {
  connectToDb,
  getDb,
  findOne,
  findMany
};
