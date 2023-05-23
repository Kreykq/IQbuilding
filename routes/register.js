const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error hashing password");
      return;
    }

    pool.getConnection((err, connection) => {
      if(err) throw err; // not connected!

      console.log('connected as id ' + connection.threadId);
      // Use the connection
      connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (error, results, fields) => {
        // When done with the connection, release it
        connection.release();

        // Handle error after the release
        if (error) throw error;

        // If no error, send response
        res.send("User added successfully");
      });
    });
  });
});

module.exports = router;