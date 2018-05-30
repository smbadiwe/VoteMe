export async function up(knex) {
  return await knex.schema.createTable("votes", t => {
    t.increments(); //id: unsigned, primary
    t.timestamps(true, true); // created_at, updated_at
    t.boolean("disabled").defaultTo(false);
    t.boolean("deleted").defaultTo(false);
    t
      .integer("memberId")
      .unsigned()
      .references("id")
      .inTable("members")
      .notNull();
    t
      .integer("contestantId")
      .unsigned()
      .references("id")
      .inTable("members")
      .notNull();
    t
      .integer("electionId")
      .unsigned()
      .references("id")
      .inTable("elections")
      .notNull();
  });
}

export async function down(knex) {
  return await knex.schema.dropTable("votes");
}
