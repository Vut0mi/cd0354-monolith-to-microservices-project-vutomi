import { Sequelize, Dialect } from 'sequelize-typescript';
import { config } from './config/config';

// Cast the dialect from config (e.g., 'postgres', 'sqlite', etc.)
const dialect: Dialect = config.dialect as Dialect;

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect: dialect,
  dialectOptions: config.dialectOptions || {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  storage: config.storage,
});

