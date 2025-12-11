const mysql = require('mysql2');

const userDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'online_exam', 
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'exam'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('MySQL connected...');
});

userDb.connect((err) => {
  if (err) {
    console.error('Failed to connect to user database:', err.stack);
    return;
  }
  console.log('Connected to the user database');
});

module.exports = {db, userDb};
