/* eslint-disable no-console */
const db = require('../db/postgres');

const text = 'SELECT * FROM routes WHERE fliesto = $1 AND fliesfrom = $2';

db.query(text, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});
