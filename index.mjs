import { app } from "./app/main.mjs"
import { doMigrate } from "./app/configs/database.mjs";

doMigrate().then(() => app.listen(process.env.PORT || 3000))
