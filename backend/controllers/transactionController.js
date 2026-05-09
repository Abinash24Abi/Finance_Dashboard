const Transaction = require('../models/Transaction');


// ADD
exports.addTransaction = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.create({
        userId: req.user.id,

        ...req.body,
      });

    res.status(201).json({
      success: true,

      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};


// GET
exports.getTransactions = async (
  req,
  res
) => {
  try {
    const transactions =
      await Transaction.find({
        userId: req.user.id,
      });

    res.status(200).json({
      success: true,

      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};