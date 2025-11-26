import React, { useState, useEffect } from 'react';
import { useAuction } from '../contexts/AuctionContext';
import { auctionAPI } from '../services/auth';
import AuctionRoom from '../components/auction/AuctionRoom';
import AuctionFeed from '../components/auction/AuctionFeed';
import TeamPurse from '../components/auction/TeamPurse';

const Auction = () => {
  const { activeAuctions, currentAuction, bidHistory } = useAuction();
  const [completedAuctions, setCompletedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedAuctions();
  }, []);

  const fetchCompletedAuctions = async () => {
    try {
      const response = await auctionAPI.getCompleted();
      setCompletedAuctions(response.data.auctions);
    } catch (error) {
      console.error('Failed to fetch completed auctions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auction-page">
      <div className="container">
        <h1>Player Auction</h1>
        
        <div className="auction-layout">
          <div className="auction-main">
            {currentAuction ? (
              <AuctionRoom auction={currentAuction} />
            ) : (
              <div className="no-active-auction">
                <h2>No Active Auction</h2>
                <p>Wait for the next auction to start</p>
              </div>
            )}
          </div>

          <div className="auction-sidebar">
            <AuctionFeed bids={bidHistory} />
            <TeamPurse />
            
            <div className="completed-auctions">
              <h3>Recently Sold</h3>
              {completedAuctions.slice(0, 5).map(auction => (
                <div key={auction._id} className="sold-player">
                  <span>{auction.player?.name}</span>
                  <span>${auction.soldPrice} to {auction.soldTo?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;