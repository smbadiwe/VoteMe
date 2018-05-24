export async function up(knex, Promise) {
    return await knex.schema
        .createTable('members', t => {
            t.increments(); //id: unsigned, primary
            t.timestamps(); // created_at, updated_at
            t.boolean('disabled');
            t.boolean('deleted');
            t.string('lastname');
            t.string('firstname');
            t.string('regnumber');
            t.string('email');
            t.string('phone');
        })
        .createTable('memberpasswords', t => {
            t.increments(); //id: unsigned, primary
            t.timestamps(); // created_at, updated_at
            t.boolean('disabled');
            t.boolean('deleted');
            t.string('password');
            t.timestamp('passwordsetdate');
            t.integer('member_id').unsigned().references('id').inTable('members').notNull();
        });
}

export async function down(knex, Promise) {
    return await knex.schema
        .dropTable('memberpasswords')
        .dropTable('members');
}
