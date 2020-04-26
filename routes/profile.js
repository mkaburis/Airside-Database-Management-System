const express = require('express');

const db = require('../db/postgres');

const { getUserById } = require('../models/user');

const router = express.Router();

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
