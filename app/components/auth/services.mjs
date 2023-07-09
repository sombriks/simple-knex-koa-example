import {knex} from "../../configs/database.mjs"
import {decrypt, encrypt, sign} from "../../configs/encryption.mjs";

export const login = async (email, pwd) => {
    const user = await knex("users").where({email}).first()
    if (!user || decrypt(user.password) !== pwd) return null
    const {id, name} = user
    return {...user, password: undefined}
}

export const signUp = async ({name, email, password}) => {
    const pwd = encrypt(password)
    const [id] = await knex("users").insert({name, email, password: pwd}, ["id"])
    return {id, name, email}
}
