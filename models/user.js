const bcrypt = require('bcrypt');
const db = require('../db/postgres');

const saltRounds = 10;

class User {
  id;
  username;
  password;
  permission;

  constructor(id, username, passwordHash, permission) {
    this.id = id;
    this.password = passwordHash;
    this.username = username;

    if (permission === 1) {
      this.permission = 'Staff';
    } else if (permission === 2) {
      this.permission = 'Admin';
    } else {
      this.permission = 'Uknown';
    }
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

async function addUser(username, passwordHash, permission) {
  const isAdded = await bcrypt.hash(passwordHash, saltRounds)
    .then(async (hash) => {
      const query = 'INSERT INTO users(username, password, permission) VALUES ($1, $2, $3) RETURNING *';

      const { rows } = await db.query(query, [username, hash, permission]);

      return rows.length > 0;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return isAdded;
}

async function changePassword(username, password) {
  const user = await getUserByUsername(username);

  if (user == null) {
    return { user: null, message: `User ${username} not found` };
  }

  const isChanged = bcrypt.hash(password, saltRounds)
    .then(async (hash) => {
      const query = 'UPDATE users SET password=$1 WHERE userid=$2;';

      const { rows } = await db.query(query, [hash, user.id]);

      return rows.length > 0;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return isChanged;
}

async function getAllUsers(permission) {
  const query = 'SELECT username, permission FROM users WHERE permission=$1';

  const { rows } = await db.query(query, [permission]);

  return rows;
}

module.exports = { authenticateUser, getUserById, getUserByUsername, addUser, changePassword, getAllUsers }
async function checkPassword(username, password) {
  const user = await getUserByUsername(username);
  if (user == null) {
    return { user: null, message: `User ${username} not found` };
  }

  if (bcrypt.compare(user.password, password)) {
    return true;
  }
  return false;
}


module.exports = { authenticateUser, checkPassword, getUserById, getUserByUsername, addUser, changePassword }
