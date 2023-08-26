import Router from "@koa/router";
import {insertBook, listBooks} from "./services.mjs";

export const bookRouter = new Router()

bookRouter.get("/books", async (ctx) =>
  ctx.body = await listBooks(ctx.query.q))

// TODO protected route
bookRouter.post("/books", async (ctx) =>
    ctx.body = await insertBook(ctx.body))
