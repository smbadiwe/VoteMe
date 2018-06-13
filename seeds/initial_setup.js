import { hashSync, genSaltSync } from "bcrypt";
import { getRoutesRequiringAuthorization } from "../src/routes";
export async function seed(knex, Promise) {
  // Deletes ALL existing entries
  await knex("userpasswords").del();
  await knex("contestants").del();
  await knex("elections").del();
  await knex("users").del();
  await knex("emailaccounts").del();
  await knex("permissions").del();
  await knex("userroles").del();

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
  await knex("users").insert([
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
  await knex("userpasswords").insert([
    { passwordHash: hashSync("donald", genSaltSync()), userId: 1 },
    { passwordHash: hashSync("ted", genSaltSync()), userId: 2 },
    { passwordHash: hashSync("marco", genSaltSync()), userId: 3 }
  ]);
  await knex("elections").insert([{ id: 1, name: "2016 GOP Primaries", year: 2016 }]);
  await knex("contestants").insert([
    { userId: 1, electionId: 1, won: true, votes: 2120 },
    { userId: 2, electionId: 1, won: false, votes: 2020 },
    { userId: 3, electionId: 1, won: false, votes: 1120 }
  ]);

  const pr = getRoutesRequiringAuthorization();
  const prKnex = [];
  pr.forEach((p, i) => {
    if (p.indexOf("/api/") > -1) {
      prKnex.push({ name: p });
    }
  });
  prKnex.map((p, i) => (p.id = i + 1));
  await knex("permissions").insert(prKnex);
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
