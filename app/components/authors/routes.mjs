import Router from "@koa/router";
import {listAuthors} from "./services.mjs";

export const authorRouter = new Router()

authorRouter.get("/authors", async ctx =>
  ctx.body = await listAuthors(ctx.request.query.q))
