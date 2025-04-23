const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Vote = mongoose.model('Vote', new mongoose.Schema({
  gender: String,
}));

app.post('/submit', async (req, res) => {
  const { gender } = req.body;
  await Vote.create({ gender });
  res.sendStatus(200);
});

app.get('/stats', async (req, res) => {
  const allVotes = await Vote.find();
  const stats = {
    total: allVotes.length,
    male: allVotes.filter(v => v.gender === 'male').length,
    female: allVotes.filter(v => v.gender === 'female').length,
    unknown: allVotes.filter(v => v.gender === 'unknown').length,
  };
  res.json(stats);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
