const express = require('express');

const router = express.Router();
const Game = require('../models/games');

router.get('/', (req, res) => {
  res.send('We are on game');
});

router.post('/', async (req, res) => {
  try {
    const game = new Game(req.body);
    const result = await game.save();
    res.send(result);
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;