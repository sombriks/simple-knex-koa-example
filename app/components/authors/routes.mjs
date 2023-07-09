import Router from "@koa/router";
import {insertAuthor, listAuthors} from "./services.mjs";
import {isAuthenticated} from "../../configs/middleware.mjs";

export const authorRouter = new Router()

authorRouter.get("/authors", async ctx =>
  ctx.body = await listAuthors(ctx.request.query.q))

authorRouter.post("/authors", isAuthenticated, async ctx =>
  ctx.body = await insertAuthor(ctx.request.body))
