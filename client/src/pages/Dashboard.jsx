import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { playerAPI } from '../services/auth';
import TShirtDetails from '../components/player/TShirtDetails';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTShirtForm, setShowTShirtForm] = useState(false);

  useEffect(() => {
    fetchPlayerProfile();
  }, []);

  const fetchPlayerProfile = async () => {
    try {
      const response = await playerAPI.getProfile();
      setPlayer(response.data.player);
      
      // Show T-Shirt form if details are not completed
      if (!response.data.player.tShirtSize || !response.data.player.tShirtNumber) {
        setShowTShirtForm(true);
      }
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleTShirtUpdate = () => {
    setShowTShirtForm(false);
    fetchPlayerProfile(); // Refresh data
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        
        {showTShirtForm && (
          <div className="alert warning">
            <p>Please complete your T-Shirt details to participate in the tournament.</p>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="profile-card">
            <h2>Profile Information</h2>
            {player && (
              <div className="profile-info">
                <p><strong>Name:</strong> {player.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {player.phone}</p>
                <p><strong>Role:</strong> {user.role}</p>
                
                {player.tShirtSize && player.tShirtNumber ? (
                  <div className="tshirt-info">
                    <h3>T-Shirt Details</h3>
                    <p><strong>Size:</strong> {player.tShirtSize}</p>
                    <p><strong>Number:</strong> {player.tShirtNumber}</p>
                    <p><strong>Name:</strong> {player.tShirtName}</p>
                    <button 
                      onClick={() => setShowTShirtForm(true)}
                      className="btn-secondary"
                    >
                      Update T-Shirt Details
                    </button>
                  </div>
                ) : (
                  <div className="tshirt-alert">
                    <p className="warning">T-Shirt details not completed</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {showTShirtForm && (
            <div className="tshirt-form-card">
              <TShirtDetails player={player} onUpdate={handleTShirtUpdate} />
            </div>
          )}

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="btn-primary">View Teams</button>
              <button className="btn-primary">Auction Room</button>
              <button className="btn-primary">Tournament Info</button>
              {user.role === 'captain' && (
                <button className="btn-primary">Manage Team</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;