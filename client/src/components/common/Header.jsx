import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h2>Cricket Tournament</h2>
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/tournament">Tournament</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/auction">Auction</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user?.role === 'admin' && (
                <Link to="/admin">Admin</Link>
              )}
              <div className="user-menu">
                <span>Welcome, {user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;