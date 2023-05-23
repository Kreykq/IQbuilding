const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'smarthome',
  password: 'cisco123'
});

module.exports = pool;