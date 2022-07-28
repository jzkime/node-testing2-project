exports.up = function(knex) {
  return knex.schema.createTable('death-note', tbl => {
    tbl.increments();
    tbl.string('name').unique().notNullable();
    tbl.string('description').defaultTo('n/a');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('death-note');
};
