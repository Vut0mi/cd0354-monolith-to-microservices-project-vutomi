import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { config } from './config/config';

const dialect: Dialect = config.dialect as Dialect;

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect,
  storage: config.storage || ':memory:',
  // 🚫 Removed dialectOptions.ssl to avoid SSL-related errors
});

