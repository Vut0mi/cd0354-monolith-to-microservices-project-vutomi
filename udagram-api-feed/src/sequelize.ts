import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize'; // ✅ Correct import for Dialect
import { config } from './config/config';

const dialect: Dialect = config.dialect as Dialect;

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
storage: config.storage || ':memory:',
});

