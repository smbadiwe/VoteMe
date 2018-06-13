export async function up(knex) {
  await knex.schema.alterTable("users", t => {
    t.string("roles");
  });
}

export async function down(knex) {
  await knex.schema.table("users", t => {
    t.dropColumn("roles");
  });
}
