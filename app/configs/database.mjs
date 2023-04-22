import Knex from "knex"
import cfg from "./knexfile.cjs"

const nodeEnv = process.env.NODE_ENV || "development"

export const knex = Knex(cfg[nodeEnv])

export const dbMigrate = () => knex.migrate.latest(cfg[nodeEnv]);
