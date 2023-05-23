const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    pool.getConnection((err, connection) => {
      if(err) throw err;
  
      connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results, fields) => {
        connection.release();
        if (error) throw error;
  
        if (results.length > 0) {
          const user = results[0];
  
          bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
              req.session.loggedin = true;
              req.session.username = user.username;
              res.send('Home!');
            } else {
              res.send('Incorrect Username and/or Password!');
            }
          });
        } else {
          res.send('Incorrect Username and/or Password!');
        }
      });
    });
});

module.exports = router;