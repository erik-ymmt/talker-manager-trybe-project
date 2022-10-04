const express = require('express');

const readFile = require('./utils/fsUtils');

const app = express();

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

module.exports = app;