
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use('/api', userRoutes);
app.use('/api', quizRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
