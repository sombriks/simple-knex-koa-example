import { knex } from "../../configs/database.mjs"

export const listBooks = async (q = "") =>
  await knex("books").whereLike("title", `%${q}%`)
