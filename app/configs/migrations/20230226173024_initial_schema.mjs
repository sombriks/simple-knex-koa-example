
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema
    .createTable("authors", (tb) => {
      tb.increments()
      tb.string("name")
      tb.timestamps(true, true)
    })
    .createTable("books", (tb) => {
      tb.increments()
      tb.string("title").notNullable()
      tb.string("isbn").unique().notNullable()
      tb.integer("authors_id").notNullable()
        .references("authors.id").onDelete("cascade")
      tb.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema
    .dropTable("books")
    .dropTable("authors")
};
