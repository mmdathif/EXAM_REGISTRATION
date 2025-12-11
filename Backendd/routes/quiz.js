const express = require('express');
const router = express.Router();
const { userDb } = require('../config/db');
const nodemailer = require('nodemailer');


router.get('/questions', async (req, res) => {
  try {
    const [results] = await userDb.promise().query('SELECT * FROM questions');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});


router.post('/send-exam-link', (req, res) => {
  const { name, email } = req.body;
  const link = `http://localhost:5173/quiz/${encodeURIComponent(name)}`;


  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Online Exam Link',
    html: `<p>Hello ${name},</p><p>Here is your exam link: <a href="${link}">${link}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Exam link sent successfully!' });
  });
});


router.post('/send-summary', (req, res) => {
  const { name, email, score, total } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Quiz Result',
    html: `<p>Hello ${name},</p><p>Your quiz score is <strong>${score}/${total}</strong>.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Summary email error:', error);
      return res.status(500).json({ error: 'Failed to send summary email' });
    }
    res.status(200).json({ message: 'Summary email sent successfully!' });
  });
});

module.exports = router;
