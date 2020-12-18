const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'learn_express',
    },
    pool: {
        min: 0,
        max: 7
    }
});

module.exports = knex;