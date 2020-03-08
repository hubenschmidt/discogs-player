import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

export const database = new Sequelize({
  username: process.env.DEVELOPMENT_DB_USERNAME,
  password: process.env.DEVELOPMENT_DB_PASSWORD,
  database: process.env.DEVELOPMENT_DB_DATABASE,
  host: process.env.DEVELOPMENT_DB_HOST,
  dialect: 'postgres',
  logging: false
});
