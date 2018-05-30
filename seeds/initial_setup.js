import { hashSync, genSaltSync } from "bcrypt";

export async function seed(knex, Promise) {
  // Deletes ALL existing entries
  await knex("memberpasswords").del();
  await knex("contestants").del();
  await knex("elections").del();
  await knex("members").del();
  await knex("emailaccounts").del();

  await knex("emailaccounts").insert([
    {
      id: 1,
      name: "GMail Account",
      smtpHost: "smtp.gmail.com",
      smtpUsername: "",
      smtpPassword: "",
      smtpPort: 587,
      isDefault: true,
      secureSsl: true,
      useDefaultCredentials: false
    }
  ]);
  // Inserts seed entries
  await knex("members").insert([
    {
      id: 1,
      lastname: "Trump",
      firstname: "Donald",
      regnumber: "djt",
      email: "trump@gmail.com",
      phone: ""
    },
    {
      id: 2,
      lastname: "Cruz",
      firstname: "Ted",
      regnumber: "trc",
      email: "cruz@gmail.com",
      phone: ""
    },
    {
      id: 3,
      lastname: "Rubio",
      firstname: "Marco",
      regnumber: "mkr",
      email: "rubio@gmail.com",
      phone: ""
    }
  ]);
  await knex("memberpasswords").insert([
    { passwordHash: hashSync("donald", genSaltSync()), memberId: 1 },
    { passwordHash: hashSync("ted", genSaltSync()), memberId: 2 },
    { passwordHash: hashSync("marco", genSaltSync()), memberId: 3 }
  ]);
  await knex("elections").insert([{ id: 1, name: "2016 GOP Primaries", year: 2016 }]);
  await knex("contestants").insert([
    { memberId: 1, electionId: 1, won: true, votes: 2120 },
    { memberId: 2, electionId: 1, won: false, votes: 2020 },
    { memberId: 3, electionId: 1, won: false, votes: 1120 }
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
