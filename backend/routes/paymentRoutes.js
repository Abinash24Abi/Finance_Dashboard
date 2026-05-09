const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  addPayment,
  getPayments,
} = require('../controllers/paymentController');

router.post(
  '/',
  authMiddleware,
  addPayment
);

router.get(
  '/',
  authMiddleware,
  getPayments
);

module.exports = router;