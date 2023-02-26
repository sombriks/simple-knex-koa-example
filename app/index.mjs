import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { bookRouter } from "./components/books/routes.mjs"

export const app = new Koa()
app.use(bodyParser())

app.use(bookRouter.routes()).use(bookRouter.allowedMethods());

