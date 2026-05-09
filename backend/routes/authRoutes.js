const express = require('express');

const router = express.Router();

const {
  signup,
  login,
  getUser,
  logout,
  findUserByEmail,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);

router.post('/login', login);

router.get(
  '/me',
  authMiddleware,
  getUser
);

router.post(
  '/logout',
  authMiddleware,
  logout
);

router.get(
  '/find-user/:email',
  findUserByEmail
);

module.exports = router;