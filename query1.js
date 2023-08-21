// databaseQuery.js
const express = require('express');
const knex = require('knex');
const knexConfig = require('./config/knexfile.js')
const app = express();
const db = knex(knexConfig.development);

// Query the 'items' table
db('items').then((items) => {
  console.log(items);
});

