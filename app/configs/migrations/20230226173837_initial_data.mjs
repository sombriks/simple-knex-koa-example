
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
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
  return await knex("authors").del()
};
