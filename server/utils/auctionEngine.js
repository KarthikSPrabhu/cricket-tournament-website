class AuctionEngine {
  constructor(io) {
    this.io = io;
    this.activeAuctions = new Map();
  }

  startAuction(auctionId, player, basePrice) {
    const auction = {
      id: auctionId,
      player,
      basePrice,
      currentBid: basePrice,
      currentBidder: null,
      bids: [],
      timer: 30,
      isActive: true,
      interval: null
    };

    this.activeAuctions.set(auctionId, auction);
    this.startTimer(auctionId);
    
    this.io.emit('auctionStarted', {
      auctionId,
      player,
      basePrice
    });

    return auction;
  }

  placeBid(auctionId, teamId, teamName, amount) {
    const auction = this.activeAuctions.get(auctionId);
    
    if (!auction || !auction.isActive) {
      return { success: false, message: 'Auction not active' };
    }

    if (amount <= auction.currentBid) {
      return { success: false, message: 'Bid must be higher than current bid' };
    }

    // Calculate increment
    const increment = auction.currentBid < 1000 ? 100 : 150;
    if ((amount - auction.currentBid) % increment !== 0) {
      return { success: false, message: `Bid must be in increments of ${increment}` };
    }

    auction.currentBid = amount;
    auction.currentBidder = { id: teamId, name: teamName };
    auction.bids.push({
      team: { id: teamId, name: teamName },
      amount,
      timestamp: new Date()
    });

    // Reset timer on new bid
    auction.timer = 30;

    this.io.emit('newBid', {
      auctionId,
      teamId,
      teamName,
      amount,
      currentBidder: auction.currentBidder
    });

    return { success: true, auction };
  }

  startTimer(auctionId) {
    const auction = this.activeAuctions.get(auctionId);
    
    auction.interval = setInterval(() => {
      auction.timer--;

      this.io.emit('timerUpdate', {
        auctionId,
        timer: auction.timer
      });

      if (auction.timer <= 0) {
        this.endAuction(auctionId);
      }
    }, 1000);
  }

  endAuction(auctionId) {
    const auction = this.activeAuctions.get(auctionId);
    
    if (auction.interval) {
      clearInterval(auction.interval);
    }

    auction.isActive = false;
    
    this.io.emit('auctionEnded', {
      auctionId,
      player: auction.player,
      soldTo: auction.currentBidder,
      soldPrice: auction.currentBid,
      status: auction.currentBidder ? 'sold' : 'unsold'
    });

    this.activeAuctions.delete(auctionId);
    
    return auction;
  }

  getAuctionStatus(auctionId) {
    return this.activeAuctions.get(auctionId);
  }

  getAllActiveAuctions() {
    return Array.from(this.activeAuctions.values());
  }
}

module.exports = AuctionEngine;