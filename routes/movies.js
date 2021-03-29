const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');

router.get('/', moviesCtrl.index);
// Use isLoggedIn middleware to protect routes
router.get('/new', isLoggedIn, moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', isLoggedIn, moviesCtrl.create);

module.exports = router;
