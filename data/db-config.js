const knex = require('knex');
const NODE_ENV = process.env.NODE_ENV || 9000;
const config = require('../knexfile');

module.exports = knex(config[NODE_ENV]);
