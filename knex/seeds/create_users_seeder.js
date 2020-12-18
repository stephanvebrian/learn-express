const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      for (let index = 0; index < 10; index++) {
        await knex('users').insert(
          { username: faker.internet.userName(), email: faker.internet.email(), password: faker.lorem.word(5), created_at: new Date() },
        );
      }
    });
};
