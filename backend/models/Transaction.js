const mongoose = require('mongoose');

const transactionSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

      name: String,

      type: String,

      amount: String,

      status: String,
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  'Transaction',
  transactionSchema
);