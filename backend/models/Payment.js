const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    title: String,

    amount: String,

    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Payment',
  paymentSchema
);