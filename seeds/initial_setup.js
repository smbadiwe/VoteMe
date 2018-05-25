const bcrypt = require("bcrypt");

export async function seed(knex, Promise) {
  // Deletes ALL existing entries
  await knex('memberpasswords').del();
  await knex('contestants').del();
  await knex('elections').del();
  await knex('members').del();
  
  // Inserts seed entries
  await knex('members').insert([
    { id: 1, lastname: 'Trump', firstname: 'Donald', regnumber: 'djt', email: 'trump@gmail.com', phone: '' },
    { id: 2, lastname: 'Cruz', firstname: 'Ted', regnumber: 'trc', email: 'cruz@gmail.com', phone: '' },
    { id: 3, lastname: 'Rubio', firstname: 'Marco', regnumber: 'mkr', email: 'rubio@gmail.com', phone: '' },
  ]);
  await knex('memberpasswords').insert([
    { passwordHash: bcrypt.hashSync('donald', bcrypt.genSaltSync()), member_id: 1 },
    { passwordHash: bcrypt.hashSync('ted', bcrypt.genSaltSync()), member_id: 2 },
    { passwordHash: bcrypt.hashSync('marco', bcrypt.genSaltSync()), member_id: 3 },
  ]);
  await knex('elections').insert([
    { id: 1, name: '2016 GOP Primaries', year: 2016 },
  ]);
  await knex('contestants').insert([
    { member_id: 1, election_id: 1, won: true, votes: 2120 },
    { member_id: 2, election_id: 1, won: false, votes: 2020 },
    { member_id: 3, election_id: 1, won: false, votes: 1120 },
  ]);
}
// export function seed(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         { id: 1, colName: 'rowValue1' },
//         { id: 2, colName: 'rowValue2' },
//         { id: 3, colName: 'rowValue3' }
//       ]);
//     });
// }
