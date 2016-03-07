/*
  initdb fwibbleDB
    Create environment for databases to live
  postgres -D fwibbleDB
    Open a connection to that database environment
  createdb development
    Create a database named development in fwibbleDB directory
  dropdb development
    Delete all database tables (for testing purposes only!)
  psql "dbname=development options=--search_path=public" -f db/fwibble.sql
    Apply the db/fwibble.sql schema to the development database
  node db/db_setup.js
    Seed the database with information
*/

// var env = process.env.NODE_ENV || 'development';
// var config = {
//     development: {
//       database: "development",
//       host: "localhost",
//       port: 5432
//     }
//     // production: {
//     //     database: 'milk',
//     //     host: 'honey',
//     //     port: 'vinegar'
//     // }
}

const config = require('../knexfile');
const env    = process.env.NODE_ENV || 'development';
const pg     = require('knex')(config[env]);

// This helps to ensure that the running database's schema is up to date
// pg.migrate.latest();

module.exports = pg;


require('../db/seeds/seed_users.js');
require('../db/seeds/seed_user_room.js');
require('../db/seeds/seed_rooms.js');
require('../db/seeds/seed_text.js');