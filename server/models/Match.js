const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  over: Number,
  ballNumber: Number,
  bowler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  batsman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  runs: Number,
  isWicket: Boolean,
  wicketType: String,
  isExtra: Boolean,
  extraType: String,
  extraRuns: Number,
  commentary: String,
  shotPosition: {
    x: Number,
    y: Number
  }
});

const inningsSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  totalRuns: {
    type: Number,
    default: 0
  },
  wickets: {
    type: Number,
    default: 0
  },
  overs: {
    type: Number,
    default: 0
  },
  balls: [ballSchema],
  batsmen: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    runs: Number,
    balls: Number,
    fours: Number,
    sixes: Number,
    isOut: Boolean,
    strikeRate: Number
  }],
  bowlers: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    overs: Number,
    maidens: Number,
    runs: Number,
    wickets: Number,
    economy: Number
  }],
  extras: {
    wides: Number,
    noBalls: Number,
    byes: Number,
    legByes: Number
  }
});

const matchSchema = new mongoose.Schema({
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  date: {
    type: Date,
    required: true
  },
  venue: String,
  type: {
    type: String,
    enum: ['league', 'playoff', 'final'],
    default: 'league'
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'abandoned'],
    default: 'upcoming'
  },
  toss: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    decision: {
      type: String,
      enum: ['bat', 'bowl']
    }
  },
  innings: [inningsSchema],
  result: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    winByRuns: Number,
    winByWickets: Number,
    manOfMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  },
  overs: {
    type: Number,
    default: 20
  },
  currentInnings: {
    type: Number,
    default: 0
  },
  isSuperOver: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);