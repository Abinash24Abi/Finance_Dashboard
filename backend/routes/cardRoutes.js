const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  addCard,
  getCards,
} = require('../controllers/cardController');

router.post(
  '/',
  authMiddleware,
  addCard
);

router.get(
  '/',
  authMiddleware,
  getCards
);

module.exports = router;