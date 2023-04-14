import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

import { bookRouter } from "./components/books/routes.mjs"

export const app = new Koa()
app.use(bodyParser())

app.use(bookRouter.routes()).use(bookRouter.allowedMethods())

const statusRouter = new Router()
statusRouter.get("/status", async ctx => ctx.body = "ONLINE")
app.use(statusRouter.routes()).use(statusRouter.allowedMethods())
