import {knex} from "../../configs/database.mjs"
import {decrypt, encrypt} from "./encryption.mjs";

export const login = async (email, pwd) => {
  const user = await knex("users").where({email}).first()
  if (!user || decrypt(user.password) !== pwd) return null
  return await user
}

export const novoUsuario = async ({name, email, password}) => {
  const pwd = encrypt(password)
  const [usuario_id] = await knex("users").insert({name, email, password: pwd})
  return usuario_id
}