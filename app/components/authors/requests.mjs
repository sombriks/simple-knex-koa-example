import {insertAuthor, listAuthors} from "./services.mjs";

export const listAuthorsRequest = async ctx =>
  ctx.body = await listAuthors(ctx.request.query.q)

export const insertAuthorRequest = async ctx =>
  ctx.body = await insertAuthor(ctx.request.body)
