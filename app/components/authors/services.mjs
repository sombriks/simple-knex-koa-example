import {knex} from "../../configs/database.mjs"

export const listAuthors = async (q = "") =>
    await knex("authors").whereLike("name", `%${q}%`)

export const insertAuthor = async (author) =>
    await knex("authors").insert(author, ["id"])
