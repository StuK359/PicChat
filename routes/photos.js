const express = require('express');
const router = express.Router();
const photosCtrl = require('../controllers/photos');
const isLoggedIn = require('../config/auth');

router.get('/', photosCtrl.index);
// Use isLoggedIn middleware to protect routes
router.get('/new', isLoggedIn, photosCtrl.new);
router.get('/:id', photosCtrl.show);
router.post('/', isLoggedIn, photosCtrl.create);
router.delete('/:id', isLoggedIn, photosCtrl.delete);

module.exports = router;
