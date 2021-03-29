const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');
const isLoggedIn = require('../config/auth');

router.get('/performers/new', isLoggedIn, performersCtrl.new);
router.post('/performers', isLoggedIn, performersCtrl.create);
router.post('/movies/:movieId/performers', isLoggedIn, performersCtrl.addToCast)

module.exports = router;