export async function up(knex) {
  await knex.schema.alterTable("users", t => {
    t.string("middlename");
  });
}

export async function down(knex) {
  await knex.schema.table("users", t => {
    t.dropColumn("middlename");
  });
}
