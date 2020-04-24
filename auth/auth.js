const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/postgres');

async function getUserByUsername(username) {
  const result = await db.query(
    'SELECT userid, username, password, permission FROM users WHERE username=$1',
    [username]
  )
    .then((res) => res.rows[0])
    .catch((err) => console.error(err.stack));

  const user = {
    id: result.userid,
    username: result.username,
    password: result.password,
    permission: result.permission
  };

  return user;
}

async function initialize(passport) {
  async function authenticatUser(username, password, done) {
    const user = await getUserByUsername(username);

    if (user == null) {
      return done(null, false, { message: `User ${username} not found` });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy(authenticatUser));

  passport.serializeUser((user, done) => {

  });

  passport.deserializeUser((id, done) => {

  });
}

module.exports = initialize;
