/**
* @type { Object.<string, import("knex").Knex.Config> }
*/
const _cfg = {
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: `${__dirname}/../../db.sqlite3`,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: `${__dirname}/migrations`,
    loadExtensions: [".mjs"],
  },
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
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_URL
  }
}