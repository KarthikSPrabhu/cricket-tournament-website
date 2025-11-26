const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true
  },
  tShirtSize: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    default: null
  },
  tShirtNumber: {
    type: Number,
    min: 1,
    max: 999,
    default: null
  },
  tShirtName: {
    type: String,
    default: null
  },
  playingRole: {
    type: String,
    enum: ['batsman', 'bowler', 'all-rounder', 'wicket-keeper'],
    default: 'batsman'
  },
  battingStyle: {
    type: String,
    enum: ['right-hand', 'left-hand'],
    default: 'right-hand'
  },
  bowlingStyle: {
    type: String,
    enum: ['right-arm fast', 'right-arm medium', 'right-arm spin', 'left-arm fast', 'left-arm medium', 'left-arm spin'],
    default: null
  },
  basePrice: {
    type: Number,
    default: 100
  },
  lists: [{
    type: String
  }],
  isCaptain: {
    type: Boolean,
    default: false
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    bestBowling: { type: String, default: '0/0' },
    average: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    economy: { type: Number, default: 0 }
  },
  isRegistered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);