const Player = require('../models/Player');
const User = require('../models/User');
const Team = require('../models/Team');
const Auction = require('../models/Auction');

exports.getAllPlayersForAdmin = async (req, res) => {
  try {
    const players = await Player.find({ isRegistered: true })
      .populate('user', 'email phone role');

    res.status(200).json({
      status: 'success',
      results: players.length,
      data: {
        players
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updatePlayerLists = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { lists, basePrice } = req.body;

    const player = await Player.findByIdAndUpdate(
      playerId,
      { 
        lists,
        basePrice: basePrice || 100
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        player
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.makePlayerCaptain = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await Player.findByIdAndUpdate(
      playerId,
      { isCaptain: true },
      { new: true }
    );

    await User.findByIdAndUpdate(player.user, { role: 'captain' });

    res.status(200).json({
      status: 'success',
      data: {
        player
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.createAuction = async (req, res) => {
  try {
    const { playerId, basePrice, startTime } = req.body;

    const auction = await Auction.create({
      player: playerId,
      basePrice,
      startTime: new Date(startTime),
      status: 'upcoming'
    });

    res.status(201).json({
      status: 'success',
      data: {
        auction
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAuctionList = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate('player')
      .populate('currentBidder', 'name')
      .populate('soldTo', 'name')
      .sort({ startTime: 1 });

    res.status(200).json({
      status: 'success',
      results: auctions.length,
      data: {
        auctions
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};