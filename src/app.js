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

module.exports = app;