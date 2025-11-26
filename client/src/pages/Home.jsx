import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/home/CountdownTimer';
import HeroSection from '../components/home/HeroSection';

const Home = () => {
  const [nextAuction, setNextAuction] = useState(null);

  // This would typically come from an API
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAuction = {
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      player: {
        name: 'Sample Player',
        basePrice: 100
      }
    };
    setNextAuction(mockAuction);
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      
      {nextAuction && (
        <section className="auction-countdown">
          <div className="container">
            <h2>Next Auction Starts In</h2>
            <CountdownTimer targetDate={nextAuction.startTime} />
            <div className="auction-info">
              <p>Player: <strong>{nextAuction.player.name}</strong></p>
              <p>Base Price: <strong>${nextAuction.player.basePrice}</strong></p>
            </div>
            <Link to="/auction" className="btn-primary">
              Go to Auction Room
            </Link>
          </div>
        </section>
      )}

      <section className="features">
        <div className="container">
          <h2>Tournament Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Player Registration</h3>
              <p>Register as a player with complete profile including T-Shirt details</p>
            </div>
            <div className="feature-card">
              <h3>Live Auction</h3>
              <p>Real-time player auction with bidding system and countdown timer</p>
            </div>
            <div className="feature-card">
              <h3>Team Management</h3>
              <p>Captain can manage team, upload logo, and view squad</p>
            </div>
            <div className="feature-card">
              <h3>Live Scoring</h3>
              <p>Real-time match scoring with detailed statistics</p>
            </div>
            <div className="feature-card">
              <h3>Leaderboards</h3>
              <p>Track player and team performance with detailed stats</p>
            </div>
            <div className="feature-card">
              <h3>Admin Dashboard</h3>
              <p>Complete tournament management for administrators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;