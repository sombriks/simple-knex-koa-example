import chai from "chai"

import { listBooks } from "./services.mjs"
import { knex, dbMigrate } from "../../configs/database.mjs";

chai.should();

describe("Books service test", () => {

  // see global hooks
  // // setup database for testing
  // before(async () => await dbMigrate())
  // after(async () => await knex.destroy())

  it("should list all books", async () => {
    const books = await listBooks("")

    books.should.be.an("array")
    books.should.have.lengthOf(3)
  })

  it("should filter books by name", async () => {
    const books = await listBooks("neuro")

    books.should.be.an("array")
    books.should.have.lengthOf(1)
  })

})