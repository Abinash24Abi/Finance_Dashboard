const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    cardHolder: String,

    cardNumber: String,

    balance: Number,

    expiry: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Card',
  cardSchema
);