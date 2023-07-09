import Router from "@koa/router"

import {sign} from "../../configs/encryption.mjs";
import {signUp, login} from "./services.mjs"

export const authRouter = new Router()

authRouter.post("/login", async ctx => {
    const {email, password} = ctx.request.body
    const user = await login(email, password)
    if (!user) return // 404
    ctx.body = sign(user)
})

authRouter.post("/signup", async ctx => { // TODO captcha protection
    const {name, email, password} = ctx.request.body
    await signUp({name, email, password})
    const user = await login(email, password)
    ctx.body = sign(user)
})
