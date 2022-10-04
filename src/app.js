const express = require('express');
const generateToken = require('./auth/tokenGenerator');
const { readFile, writeFile } = require('./utils/fsUtils');
const { 
  validateEmail, verifyEmail, validatePassword, verifyPassword, 
} = require('./middlewares/loginValidation');
const { 
  verifyToken,
  validateToken } = require('./middlewares/talkerValidation');

const app = express();
app.use(express.json());

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readFile();
    res.status(200).json(talkers);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talkerById = talkers.find((talker) => Number(talker.id) === Number(id));
    if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talkerById);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

app.post('/login', validateEmail, verifyEmail, validatePassword, verifyPassword, (_req, res) => {
  const token = generateToken();
  console.log(token);
  res.status(200).json({ token });
});

app.post('/talker', verifyToken, validateToken, async (req, res) => {
  const newTalker = req.body;
  const currentTalkers = await readFile();
  newTalker.id = currentTalkers.length + 1;
  const updatedTalkers = [...currentTalkers, newTalker];
  await writeFile(updatedTalkers);
  res.status(201).json(newTalker);
});

module.exports = app;