const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Card = require('../models/Card');

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Signup Success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // COOKIE
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production'
          ? 'none'
          : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login Success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// GET USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select('-password');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// LOGOUT
exports.logout = async (req, res) => {
  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: 'Logout Success',
  });
};

// FIND USER BY EMAIL
// FIND USER BY EMAIL
exports.findUserByEmail =
  async (req, res) => {
    try {
      const { email } =
        req.params;

      const user =
        await User.findOne({
          email: email.trim(),
        }).select('-password');

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              'User not found',
          });
      }

      // GET USER CARDS
      const cards =
        await Card.find({
          userId: user._id,
        });

      res.status(200).json({
        success: true,

        user: {
          _id: user._id,

          name: user.name,

          email: user.email,

          cards,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          'Server Error',
      });
    }
  };