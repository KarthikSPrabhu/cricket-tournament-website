const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  players: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    boughtPrice: Number,
    joiningDate: {
      type: Date,
      default: Date.now
    }
  }],
  purse: {
    type: Number,
    default: 10000
  },
  purseSpent: {
    type: Number,
    default: 0
  },
  matches: {
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    tied: { type: Number, default: 0 }
  },
  points: {
    type: Number,
    default: 0
  },
  netRunRate: {
    type: Number,
    default: 0
  },
  color: {
    primary: String,
    secondary: String
  }
}, {
  timestamps: true
});

teamSchema.virtual('remainingPurse').get(function() {
  return this.purse - this.purseSpent;
});

teamSchema.virtual('playerCount').get(function() {
  return this.players.length;
});

module.exports = mongoose.model('Team', teamSchema);