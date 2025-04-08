const express = require('express');
const db = require('./db');
require('dotenv').config();
const highScoreModel = require('./highScoreModel');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.static('frontend'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('frontend/index.html');
});

db.connectDB();

app.get('/high-scores', async (req, res) => {
  try {
    const scores = await highScoreModel.find({});
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/high-scores', (req, res) => {
  try {
    const newScore = new highScoreModel(req.body);
    newScore.save();
    res.json(newScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
