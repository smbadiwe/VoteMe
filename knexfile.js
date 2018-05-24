// changing this to ES6 style is problematic.
require('babel-register');
const path = require('path');
const BASE_PATH = __dirname; // path.join(__dirname, 'db');

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(BASE_PATH, 'migrations'),
    }
  },
  development: {
    client: 'mysql',
    connection: {
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USR,
      password: process.env.APP_DB_PWD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(BASE_PATH, 'migrations'),
    }
  },
  staging: {
    client: 'mysql',
    connection: {
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USR,
      password: process.env.APP_DB_PWD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(BASE_PATH, 'migrations'),
    }
  },
  production: {
    client: 'mysql',
    connection: {
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USR,
      password: process.env.APP_DB_PWD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(BASE_PATH, 'migrations'),
    }
  }

};
