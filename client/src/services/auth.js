import API from './api';

export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  verifyToken: () => API.get('/auth/verify'),
};

export const playerAPI = {
  getProfile: () => API.get('/players/profile'),
  updateTShirtDetails: (data) => API.patch('/players/tshirt-details', data),
  getAllPlayers: () => API.get('/players/all'),
};

export const adminAPI = {
  getAllPlayers: () => API.get('/admin/players'),
  updatePlayerLists: (playerId, data) => API.patch(`/admin/players/${playerId}/lists`, data),
  makePlayerCaptain: (playerId) => API.patch(`/admin/players/${playerId}/make-captain`),
  createAuction: (data) => API.post('/admin/auction', data),
  getAuctionList: () => API.get('/admin/auction'),
};

export const auctionAPI = {
  getActive: () => API.get('/auction/active'),
  getCompleted: () => API.get('/auction/completed'),
};
