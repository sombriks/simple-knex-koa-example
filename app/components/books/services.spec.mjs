import chai from "chai"

import { listBooks } from "./services.mjs"
import { knex, doMigrate } from "../../configs/database.mjs";

chai.should();

describe("Books service test", () => {

  before(async () => await doMigrate())
  after(async () => await knex.destroy())

  it("should list books by name", async () => {
    const books = await listBooks("")

    books.should.be.an("array")
  })

})