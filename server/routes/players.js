const express = require('express');
const { protect } = require('../controllers/authController');
const { 
  getPlayerProfile, 
  updateTShirtDetails, 
  getAllPlayers,
  getPlayerStats 
} = require('../controllers/playerController');

const router = express.Router();

router.use(protect);

router.get('/profile', getPlayerProfile);
router.patch('/tshirt-details', updateTShirtDetails);
router.get('/all', getAllPlayers);
router.get('/stats', getPlayerStats);

module.exports = router;