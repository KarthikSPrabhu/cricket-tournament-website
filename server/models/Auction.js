const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  currentBid: {
    type: Number,
    default: 0
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  soldPrice: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'sold', 'unsold'],
    default: 'upcoming'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  bids: [{
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    amount: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  timer: {
    type: Number,
    default: 30
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Auction', auctionSchema);