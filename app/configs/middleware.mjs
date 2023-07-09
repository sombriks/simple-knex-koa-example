import {verify} from "./encryption.mjs";

export const isAuthenticated = async (ctx, next) => {
  const header = ctx.request.header?.authorization
  if (!header) return ctx.throw(401, "Missing auth token")
  const token = header.replace("Bearer ", "")
  const data = verify({token})
  await next()
}
