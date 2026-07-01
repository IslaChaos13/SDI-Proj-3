const { faker } = require('@faker-js/faker');

function createUsers(rows){
  let users = [];

  for (let i = 1; i <= rows; i++){

    users.push({

    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    admin: false,
    })
  }
  return users
}
/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(createUsers(3));

};
