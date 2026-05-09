const mongoose = require('mongoose');

const transferSchema =
  new mongoose.Schema(
    {
      senderId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',
      },

      receiverEmail: String,

      amount: Number,

      type: String,

      note: String,

      status: {
        type: String,

        default: 'Success',
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  'Transfer',
  transferSchema
);