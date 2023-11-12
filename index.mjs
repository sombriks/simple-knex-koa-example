import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/configs/database.mjs";

const {PORT = 3000, NODE_ENV} = process.env

dbMigrate().then(() =>
  app.listen(PORT))

console.log(`listening PORT [${PORT}] in [${NODE_ENV}] mode`)
