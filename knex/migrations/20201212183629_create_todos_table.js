
exports.up = function (knex) {
    return knex.schema.createTable('todos', function (table) {
        table.increments();
        table.string('title');
        table.string('content');
        table.integer('user_id');
        table.timestamps();
        table.timestamp('deleted_at').nullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('todos');
};
