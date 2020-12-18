
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username');
        table.string('email');
        table.string('password');
        table.timestamps();
        table.timestamp('deleted_at').nullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
