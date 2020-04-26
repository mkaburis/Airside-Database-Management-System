const express = require('express');

const { getUserById } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req.session;

  const { username } = user;
  const { permission } = user;

  return res.json({ name: username, access: permission });
});

// /* GET users info. */
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;

//   const user = getUserById(userId);
//   const word = user.id;
//     const {
//     rows
//   } = await db.query('SELECT * FROM users WHERE passengerid = $1', [
//     userId
//   ]);
//   if (rows.length < 1) {
//     res.sendStatus(404).json({ error: 'user\'s information not found' });
//   } else {
//     res.send(rows[0]);
//   }
// });

module.exports = router;
