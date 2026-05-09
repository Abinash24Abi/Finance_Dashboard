const Transfer = require('../models/Transfer');

const Card = require('../models/Card');

const User = require('../models/User');


// SEND MONEY
exports.sendMoney = async (req, res) => {
  try {
    const {
      receiverEmail,
      receiverCardId,
      amount,
      note,
    } = req.body;

    const transferAmount = Number(amount);

    if (!transferAmount || transferAmount <= 0) {
      return res.status(400).json({
        message: 'Invalid amount',
      });
    }

    const senderCard = await Card.findOne({
      userId: req.user.id,
    });

    if (!senderCard) {
      return res.status(400).json({
        message: 'No Card Found',
      });
    }

    const receiverCard = await Card.findById(receiverCardId);

    if (!receiverCard) {
      return res.status(404).json({
        message: 'Receiver card not found',
      });
    }

    if (senderCard.balance < transferAmount) {
      return res.status(400).json({
        message: 'Insufficient Balance',
      });
    }

    senderCard.balance -= transferAmount;
    receiverCard.balance += transferAmount;

    await senderCard.save();
    await receiverCard.save();

    const transfer = await Transfer.create({
      senderId: req.user.id,
      receiverEmail,
      amount: transferAmount,
      note,
      type: 'Send',
      status: 'Success',
    });

    res.status(200).json({
      success: true,
      transfer,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};

// RECEIVE MONEY
exports.receiveMoney = async (
  req,
  res
) => {
  try {
    const { amount, note } =
      req.body;

    const card = await Card.findOne({
      userId: req.user.id,
    });

    card.balance =
      card.balance + Number(amount);

    await card.save();

    const transfer =
      await Transfer.create({
        senderId: req.user.id,

        amount,

        note,

        type: 'Receive',
      });

    res.status(200).json({
      success: true,

      transfer,

      balance: card.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};


// REQUEST MONEY
exports.requestMoney = async (
  req,
  res
) => {
  try {
    const {
      receiverEmail,
      amount,
      note,
    } = req.body;

    const request =
      await Transfer.create({
        senderId: req.user.id,

        receiverEmail,

        amount,

        note,

        type: 'Request',

        status: 'Pending',
      });

    res.status(200).json({
      success: true,

      request,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};


// INVOICE
exports.createInvoice = async (
  req,
  res
) => {
  try {
    const {
      receiverEmail,
      amount,
      note,
    } = req.body;

    const invoice =
      await Transfer.create({
        senderId: req.user.id,

        receiverEmail,

        amount,

        note,

        type: 'Invoice',
      });

    res.status(200).json({
      success: true,

      invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};


// GET ALL
exports.getTransfers = async (
  req,
  res
) => {
  try {
    const transfers =
      await Transfer.find({
        senderId: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      transfers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
};