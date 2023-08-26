import {sign} from "../../configs/encryption.mjs";
import {login, signUp} from "./services.mjs"

export const loginRequest = async ctx => {
  const {email, password} = ctx.request.body
  const user = await login(email, password)
  if (!user) return // 404
  ctx.body = sign(user)
}

export const signupRequest = async ctx => { // TODO captcha protection
  const {name, email, password} = ctx.request.body
  await signUp({name, email, password})
  const user = await login(email, password)
  ctx.body = sign(user)
}
