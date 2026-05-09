const Card = require('../models/Card');


// ADD CARD
exports.addCard = async (
  req,
  res
) => {
  try {
    const card = await Card.create({
      userId: req.user.id,

      ...req.body,
    });

    res.status(201).json({
      success: true,

      card,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};


// GET CARDS
exports.getCards = async (
  req,
  res
) => {
  try {
    const cards = await Card.find({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,

      cards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: 'Server Error',
    });
  }
};