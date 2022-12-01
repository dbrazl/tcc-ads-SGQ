require('dotenv/config');

const defaultMongoURL = "mongodb://localhost:27017/cpa-db";

const databaseConfig = {
  mongoURL: process.env.MONGO_URL || defaultMongoURL,
};

export { databaseConfig };
