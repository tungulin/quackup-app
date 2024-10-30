import type { Knex } from 'knex';
import 'dotenv/config';

console.log('Database migrate:', process.env.DB_DATABASE)

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = config;
