const bcrypt = require('bcrypt');

const saltRounds = 10;

const password = 'password';

bcrypt.hash(password, saltRounds, async (err, hash) => {
  if (err) {
    return;
  }
  console.log(hash);
});
