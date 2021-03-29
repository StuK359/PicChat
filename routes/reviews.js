const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isLoggedIn = require('../config/auth');

router.post('/movies/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete);

module.exports = router;