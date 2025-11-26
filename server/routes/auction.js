const express = require('express');
const { protect } = require('../controllers/authController');
const Auction = require('../models/Auction');

const router = express.Router();

router.use(protect);

router.get('/active', async (req, res) => {
  try {
    const activeAuctions = await Auction.find({ status: 'live' })
      .populate('player')
      .populate('currentBidder', 'name logo')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: {
        auctions: activeAuctions
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

router.get('/completed', async (req, res) => {
  try {
    const completedAuctions = await Auction.find({ status: { $in: ['sold', 'unsold'] } })
      .populate('player')
      .populate('soldTo', 'name logo')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: {
        auctions: completedAuctions
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;