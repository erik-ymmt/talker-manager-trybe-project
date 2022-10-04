const express = require('express');
const generateToken = require('./auth/tokenGenerator');
const { readFile, writeFile } = require('./utils/fsUtils');
const { 
  validateEmail, verifyEmail, validatePassword, verifyPassword, 
} = require('./middlewares/loginValidation');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate } = require('./middlewares/talkerValidation');

const app = express();
app.use(express.json());

app.get('/talker/search', validateToken, async (req, res) => {
  const { query } = req;
  console.log(query);
  const serchedTerm = (query.q).toLowerCase();
  const talkers = await readFile();
  const searchResult = talkers.filter((talker) => talker.name.toLowerCase().includes(serchedTerm));
  res.status(200).json(searchResult);
});

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

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate, async (req, res) => {
    const newTalker = req.body;
    const currentTalkers = await readFile();
    newTalker.id = currentTalkers.length + 1;
    const updatedTalkers = [...currentTalkers, newTalker];
    await writeFile(updatedTalkers);
    res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate, async (req, res) => {
    const { id } = req.params;
    const newTalker = req.body;
    const currentTalkers = await readFile();
    const removeTalker = currentTalkers.filter((talker) => talker.id !== Number(id));
    newTalker.id = Number(id);
    const updatedTalkers = [...removeTalker, newTalker];
    await writeFile(updatedTalkers);
    res.status(200).json(newTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const currentTalkers = await readFile();
  const removeTalker = currentTalkers.filter((talker) => talker.id !== Number(id));
  await writeFile(removeTalker);
  res.status(204).end();
});

module.exports = app;