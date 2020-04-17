// File Name: database.js
// Airside - Tampa International Airport Database Management System
// COP 4710 Database Design (Spring 2020)
// Mihail Kaburis, Jose-Pablo Mantilla, Jody Rutter

const { Pool } = require('pg');

const pool = new Pool({
  user: 'airport_admin',
  host: 'localhost',
  database: 'airsidedb',
  password: 'tampa_airport',
  port: '5432',
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

pool.query;
>
module.exports = postgressDb;
