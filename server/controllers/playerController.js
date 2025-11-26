const Player = require('../models/Player');
const User = require('../models/User');

exports.getPlayerProfile = async (req, res) => {
  try {
    const player = await Player.findOne({ user: req.user._id })
      .populate('user', 'email phone role');

    if (!player) {
      return res.status(404).json({
        status: 'error',
        message: 'Player profile not found'
      });
    }

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

exports.updateTShirtDetails = async (req, res) => {
  try {
    const { tShirtSize, tShirtNumber, tShirtName } = req.body;

    const player = await Player.findOneAndUpdate(
      { user: req.user._id },
      {
        tShirtSize,
        tShirtNumber,
        tShirtName,
        profileCompleted: true
      },
      { new: true, runValidators: true }
    );

    await User.findByIdAndUpdate(req.user._id, { profileCompleted: true });

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

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({ isRegistered: true })
      .populate('user', 'email phone role')
      .select('-stats');

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

exports.getPlayerStats = async (req, res) => {
  try {
    const players = await Player.find({ isRegistered: true })
      .populate('user', 'email phone role')
      .select('name stats playingRole');

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