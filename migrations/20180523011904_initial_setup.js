export async function up(knex) {
  return await knex.schema
    .createTable("members", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.string("lastname").notNull();
      t.string("firstname").notNull();
      t.string("regnumber").notNull();
      t.string("email").notNull();
      t.string("phone");
    })
    .createTable("memberpasswords", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.string("passwordHash").notNull();
      t.timestamp("passwordsetdate").defaultTo(knex.fn.now());
      t.integer("member_id")
        .unsigned()
        .references("id")
        .inTable("members")
        .notNull();
    })
    .createTable("elections", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.string("name");
      t.integer("year");
      t.date("electionday");
    })
    .createTable("contestants", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.integer("votes");
      t.boolean("won");
      t.integer("member_id")
        .unsigned()
        .references("id")
        .inTable("members")
        .notNull();
      t.integer("election_id")
        .unsigned()
        .references("id")
        .inTable("elections")
        .notNull();
    });
}

export async function down(knex) {
  return await knex.schema
    .dropTable("memberpasswords")
    .dropTable("contestants")
    .dropTable("members")
    .dropTable("elections");
}
