const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllPlayersForAdmin,
  updatePlayerLists,
  makePlayerCaptain,
  createAuction,
  getAuctionList
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/players', getAllPlayersForAdmin);
router.patch('/players/:playerId/lists', updatePlayerLists);
router.patch('/players/:playerId/make-captain', makePlayerCaptain);
router.post('/auction', createAuction);
router.get('/auction', getAuctionList);

module.exports = router;