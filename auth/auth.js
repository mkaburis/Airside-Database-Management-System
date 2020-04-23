const bcrypt = require('bcrypt');
const passport = require('passport');
const { LocalStrategy } = require('passport-local');
const db = require('../db/postgres');

passport.use(new LocalStrategy((username, password, cb) => {
  // eslint-disable-next-line consistent-return
  db.query('SELECT userid, username, password, permission FROM users WHERE username=$1', [username], (err, result) => {
    if (err) {
      return cb(err);
    }

    if (result.rows.length > 0) {
      const first = result.rows[0];
      bcrypt.compare(password, first.password, (res) => {
        if (res) {
          cb(null, { id: first.userid, username: first.username, permission: first.permission });
        }
        cb(null, false);
      });
    } else {
      cb(null, false);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.query('SELECT userid, username, type FROM users WHERE userid = $1', [parseInt(id, 10)], (err, results) => {
    if (err) {
      return cb(err);
    }

    return cb(null, results.rows[0]);
  });
});
