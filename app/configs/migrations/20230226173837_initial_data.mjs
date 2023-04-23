
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex("users").insert({
    id:1,
    name:"adm",
    email:"test@test.com",
    password:"6b6e6f776e20696e697469616c697a61@09ef83851dbb53c8eb7d47634bcb08ec"
  })
  await knex("authors").insert([
    { id: 1, name: "Willian Gibson" },
    { id: 2, name: "Phillip K. Dick" }
  ])
  return knex("books").insert([
    { title: "Neuromancer", isbn: "9780441007462", authors_id: 1 },
    { title: "Do Androids Dream of Electric Sheep?", isbn: "9781857988130", authors_id: 2 },
    { title: "The Man in the High Castle", isbn: "9780679740674", authors_id: 2 }
  ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex("books").del()
  await knex("authors").del()
  return knex("users").del()
};
