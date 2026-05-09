const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  sendMoney,
  receiveMoney,
  requestMoney,
  createInvoice,
  getTransfers,
} = require('../controllers/transferController');

router.post(
  '/send',
  authMiddleware,
  sendMoney
);

router.post(
  '/receive',
  authMiddleware,
  receiveMoney
);

router.post(
  '/request',
  authMiddleware,
  requestMoney
);

router.post(
  '/invoice',
  authMiddleware,
  createInvoice
);

router.get(
  '/',
  authMiddleware,
  getTransfers
);

module.exports = router;