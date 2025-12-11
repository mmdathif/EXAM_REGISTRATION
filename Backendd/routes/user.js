const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

router.post('/login', (req, res) => {
  const {  email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }


  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});


router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const checkUserSql = 'SELECT * FROM users WHERE name = ? OR email = ?';
  db.query(checkUserSql, [name, email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User with this name or email already exists' });
    }

    const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [name, email, password], (err2) => {
      if (err2) {
        console.error('Insert error:', err2);
        return res.status(500).json({ error: 'Failed to register user' });
      }

      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;
