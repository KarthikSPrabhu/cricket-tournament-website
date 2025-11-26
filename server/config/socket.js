const AuctionEngine = require('../utils/auctionEngine');

module.exports = (io) => {
  const auctionEngine = new AuctionEngine(io);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinAuction', (auctionId) => {
      socket.join(auctionId);
      console.log(`User ${socket.id} joined auction ${auctionId}`);
    });

    socket.on('placeBid', (data) => {
      const { auctionId, teamId, teamName, amount } = data;
      const result = auctionEngine.placeBid(auctionId, teamId, teamName, amount);
      
      if (result.success) {
        io.to(auctionId).emit('bidSuccess', result.auction);
      } else {
        socket.emit('bidError', { message: result.message });
      }
    });

    socket.on('getAuctionStatus', (auctionId) => {
      const status = auctionEngine.getAuctionStatus(auctionId);
      socket.emit('auctionStatus', status);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return auctionEngine;
};