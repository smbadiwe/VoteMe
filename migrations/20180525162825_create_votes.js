export async function up(knex) {
    return await knex.schema
    .createTable('votes', t => {
        t.increments(); //id: unsigned, primary
        t.timestamps(true, true); // created_at, updated_at
        t.boolean('disabled').defaultTo(false);
        t.boolean('deleted').defaultTo(false);
        t.integer('member_id').unsigned().references('id').inTable('members').notNull();
        t.integer('contestant_id').unsigned().references('id').inTable('members').notNull();
        t.integer('election_id').unsigned().references('id').inTable('elections').notNull();
    })
}

export async function down(knex) {
    return await knex.schema
        .dropTable('votes');
}
