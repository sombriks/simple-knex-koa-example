import Router from "@koa/router"

import {sign} from "./encryption.mjs";
import {novoUsuario, login} from "./services.mjs"

export const authRouter = new Router()

authRouter.post("/login", async ctx => {
  const {email, password} = ctx.request.body
  const user = await login(email, password)
  if (!user) return // 404
  const payload = {...user, password: undefined}
  ctx.body = sign(payload)
})

authRouter.post("/signup", async ctx => { // TODO captcha protection
  const {nome, email, senha} = ctx.request.body
  const id = await novoUsuario({name, email, password})
  ctx.body = {id, name, email}
})