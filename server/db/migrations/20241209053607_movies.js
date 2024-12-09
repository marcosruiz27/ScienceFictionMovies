/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('movies', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.text('description').notNullable()
    table.integer('release_year').notNullable()
    table.string('director').notNullable()
    table.integer('duration').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('movies')
}
