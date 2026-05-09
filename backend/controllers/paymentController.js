const Payment = require('../models/Payment');


// ADD
exports.addPayment = async (
  req,
  res
) => {
  try {
    const payment =
      await Payment.create({
        userId: req.user.id,

        ...req.body,
      });

    res.status(201).json({
      success: true,

      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};


// GET
exports.getPayments = async (
  req,
  res
) => {
  try {
    const payments =
      await Payment.find({
        userId: req.user.id,
      });

    res.status(200).json({
      success: true,

      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};