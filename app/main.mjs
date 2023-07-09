import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

import { bookRouter } from "./components/books/routes.mjs"
import { authRouter } from "./components/auth/routes.mjs"
import {authorRouter} from "./components/authors/routes.mjs";

export const app = new Koa()

const statusRouter = new Router()
statusRouter.get("/status", async ctx => ctx.body = "ONLINE")

app
  .use(bodyParser())

  .use(statusRouter.routes())
  .use(statusRouter.allowedMethods())

  .use(authRouter.routes())
  .use(authRouter.allowedMethods())

  .use(authorRouter.routes())
  .use(authorRouter.allowedMethods())

  .use(bookRouter.routes())
  .use(bookRouter.allowedMethods())
