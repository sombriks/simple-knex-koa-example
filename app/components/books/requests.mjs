import {insertBook, listBooks} from "./services.mjs";

export const listBooksRequest = async (ctx) =>
  ctx.body = await listBooks(ctx.query.q)

export const insertBookRequest = async (ctx) =>
  ctx.body = await insertBook(ctx.body)
