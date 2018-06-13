export async function up(knex) {
  await knex.schema
    .createTable("permissions", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.string("name").notNull();
    })
    .createTable("userroles", t => {
      t.increments(); //id: unsigned, primary
      t.timestamps(true, true); // created_at, updated_at
      t.boolean("disabled").defaultTo(false);
      t.boolean("deleted").defaultTo(false);
      t.string("name").notNull();
      t.string("permissionIds");
    });

  await knex.schema.table("contestants", t => {
    t.renameColumn("memberId", "userId");
  });

  await knex.schema.table("votes", t => {
    t.renameColumn("memberId", "userId");
  });
  await knex.schema.table("memberpasswords", t => {
    t.renameColumn("memberId", "userId");
  });
  await knex.schema.renameTable("members", "users");
  await knex.schema.renameTable("memberpasswords", "userpasswords");
}

export async function down(knex) {
  await knex.schema.dropTable("permissions").dropTable("userroles");

  await knex.schema.renameTable("users", "members");
  await knex.schema.renameTable("userpasswords", "memberpasswords");
  await knex.schema.table("contestants", t => {
    t.renameColumn("userId", "memberId");
  });

  await knex.schema.table("votes", t => {
    t.renameColumn("userId", "memberId");
  });

  await knex.schema.table("memberpasswords", t => {
    t.renameColumn("userId", "memberId");
  });
}
