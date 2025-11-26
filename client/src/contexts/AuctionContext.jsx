import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const AuctionContext = createContext();

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};

export const AuctionProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('auctionStarted', (data) => {
      setActiveAuctions(prev => [...prev, data]);
      setCurrentAuction(data);
    });

    newSocket.on('newBid', (data) => {
      setBidHistory(prev => [data, ...prev]);
      setCurrentAuction(prev => prev ? { ...prev, currentBid: data.amount } : null);
    });

    newSocket.on('timerUpdate', (data) => {
      setCurrentAuction(prev => prev ? { ...prev, timer: data.timer } : null);
    });

    newSocket.on('auctionEnded', (data) => {
      setActiveAuctions(prev => prev.filter(a => a.auctionId !== data.auctionId));
      setCurrentAuction(null);
    });

    return () => newSocket.close();
  }, []);

  const placeBid = (auctionId, teamId, teamName, amount) => {
    if (socket) {
      socket.emit('placeBid', { auctionId, teamId, teamName, amount });
    }
  };

  const joinAuction = (auctionId) => {
    if (socket) {
      socket.emit('joinAuction', auctionId);
    }
  };

  const value = {
    socket,
    activeAuctions,
    currentAuction,
    bidHistory,
    placeBid,
    joinAuction
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};