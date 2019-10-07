// config/config.js

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEVELOPMENT_DB_USERNAME,
    password: process.env.DEVELOPMENT_DB_PASSWORD,
    database: process.env.DEVELOPMENT_DB_DATABASE,
    host: process.env.DEVELOPMENT_DB_HOST,
    dialect: "postgres",
    operatorsAliases: false
  },
  test: {
    username: "postgres_test",
    password: null,
    database: "discogs-player_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_DATABASE,
    host: process.env.PRODUCTION_DB_HOST,
    URI: process.env.PRODUCTION_DATABASE_URL,
    dialect: "postgres",
    operatorsAliases: false
  }
};
