const bcrypt = require('bcrypt');

const saltRounds = 10;

const password = 'password';

const hash = '$2b$10$UkAhDWyEB2/03gTXog50qeR7dfOH..elxlKmKUIXG732fawF2Hut6';

// bcrypt.hash(password, saltRounds, async (err, hash) => {
//   if (err) {
//     return;
//   }
//   console.log(hash);
// });

bcrypt.compare(password, hash, (err, res) => {
  console.log(res);
});
