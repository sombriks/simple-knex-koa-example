import Router from "@koa/router"

import {sign} from "./encryption.mjs";
import {signUp, login} from "./services.mjs"

export const authRouter = new Router()

authRouter.post("/login", async ctx => {
  const {email, password} = ctx.request.body
  const user = await login(email, password)
  if (!user) return // 404
  const payload = {...user, password: undefined}
  ctx.body = sign(payload)
})

authRouter.post("/signup", async ctx => { // TODO captcha protection
  const {name, email, password} = ctx.request.body
  const id = await signUp({name, email, password})
  ctx.body = sign({id, name, email})
})