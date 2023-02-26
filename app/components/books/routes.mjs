import Router from "@koa/router";
import { listBooks } from "./services.mjs";

export const bookRouter = new Router()

bookRouter.get("/books", async (ctx) =>
  ctx.body = await listBooks(ctx.query.q))