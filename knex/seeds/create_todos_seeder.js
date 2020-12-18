const faker = require('faker');

const userIds = [...Array(10).keys()].map(val => val+1);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(async function () {
      // Inserts seed entries
      for (let i = 0; i < 10; i++) {
        await knex('todos').insert(
          { title: faker.lorem.words(2), content: faker.lorem.words(50), user_id: faker.random.arrayElement(userIds), created_at: new Date() }
        );
      }
    });
};
