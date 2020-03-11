import { Sequelize } from 'sequelize-typescript';

export default new Sequelize({
  username: process.env.DEVELOPMENT_DB_USERNAME,
  password: process.env.DEVELOPMENT_DB_PASSWORD,
  database: process.env.DEVELOPMENT_DB_DATABASE,
  host: process.env.DEVELOPMENT_DB_HOST,
  dialect: 'postgres',
  logging: false
});
