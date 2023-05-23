const express = require('express');
const router = express.Router();
const pool = require('../../database/db');

router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!

    console.log('connected as id ' + connection.threadId);
    // Use the connection
    connection.query('INSERT INTO user SET ?', {username: username, email: email, password: password}, (error, results, fields) => {
      // When done with the connection, release it
      connection.release();

      // Handle error after the release
      if (error) throw error;

      // If no error, send response
      res.send("User added successfully");
    });
  });
});

module.exports = router;