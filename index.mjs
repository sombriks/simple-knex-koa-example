import { app } from "./app/main.mjs"
import { dbMigrate } from "./app/configs/database.mjs";

dbMigrate().then(() =>
  app.listen(process.env.PORT || 3000))
