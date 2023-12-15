const path = require('path')
/**
* @type { Object.<string, import("knex").Knex.Config> }
*/
const _cfg = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, '../../db.sqlite3')
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    loadExtensions: ['.mjs']
  }
}

/**
* @type { Object.<string, import("knex").Knex.Config> }
*/
module.exports = {
  development: { ..._cfg },
  test: {
    ..._cfg,
    connection: {
      filename: ':memory:'
    }
  },
  production: {
    ..._cfg,
    client: 'pg',
    connection: process.env.PG_CONNECTION_URL
  }
}
