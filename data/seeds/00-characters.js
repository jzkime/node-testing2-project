exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('death-note').truncate()
  await knex('death-note').insert([
    {id: 1, name: 'Light', description: 'has deathnote'},
    {id: 2, name: 'Ryuk', description: 'shinigami'},
    {id: 3, name: 'L', description: 'human'}
  ]);
};
