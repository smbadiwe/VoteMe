export async function up(knex) {
  await knex.schema.createTable("emailaccounts", t => {
    t.increments(); //id: unsigned, primary
    t.timestamps(true, true); // created_at, updated_at
    t.boolean("disabled").defaultTo(false);
    t.boolean("deleted").defaultTo(false);
    t.string("name");
    t.string("email");
    t.string("smtpUsername");
    t.string("smtpPassword");
    t.string("smtpHost");
    t.integer("smtpPort");
    t.boolean("useDefaultCredentials").defaultTo(false);
    t.boolean("secureSsl").defaultTo(true);
    t.boolean("isDefault").defaultTo(false);
  });

  await knex.schema.table("contestants", t => {
    t.renameColumn("election_id", "electionId");
    t.renameColumn("member_id", "memberId");
  });

  await knex.schema.table("votes", t => {
    t.renameColumn("election_id", "electionId");
    t.renameColumn("member_id", "memberId");
    t.renameColumn("contestant_id", "contestantId");
  });

  await knex.schema.table("memberpasswords", t => {
    t.renameColumn("member_id", "memberId");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("emailaccounts");

  await knex.schema.table("contestants", t => {
    t.renameColumn("electionId", "election_id");
    t.renameColumn("memberId", "member_id");
  });

  await knex.schema.table("votes", t => {
    t.renameColumn("electionId", "election_id");
    t.renameColumn("memberId", "member_id");
    t.renameColumn("contestantId", "contestant_id");
  });

  await knex.schema.table("memberpasswords", t => {
    t.renameColumn("memberId", "member_id");
  });
}
