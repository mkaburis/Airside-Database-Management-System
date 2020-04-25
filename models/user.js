const bcrypt = require('bcrypt');
const db = require('../db/postgres');

class User {
  id;
  username;
  password;
  permission;

  constructor(id, username, passwordHash, permission) {
    this.id = id;
    this.password = passwordHash;
    this.username = username;
    this.permission = permission
  }
}

async function getUserByUsername(username) {
  const result = await db.query(
    'SELECT userid, username, password, permission FROM users WHERE username=$1',
    [username]
  )
    .then((res) => res.rows[0])
    .catch((err) => console.error(err.stack));

  if (result === undefined) {
    return null;
  }

  const user = new User(result.userid, result.username, result.password, result.permission);

  return user;
}

async function getUserById(id) {
  const result = await db.query(
    'SELECT userid, username, password, permission FROM users WHERE userid=$1',
    [id]
  )
    .then((res) => res.rows[0])
    .catch((err) => console.error(err.stack));

  if (result === undefined) {
    return null;
  }

  const user = User(result.userid, result.username, result.password, result.permission);

  return user;
}

async function authenticateUser(username, password) {
  const user = await getUserByUsername(username);

  if (user == null) {
    return { user: null, message: `User ${username} not found` };
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return { user: user, message: "User found" };
    }
    return { user: null, message: 'Password incorrect' };
  } catch (error) {
    return ({ user: null, message: error });
  }
}

module.exports = { authenticateUser, getUserById, getUserByUsername }