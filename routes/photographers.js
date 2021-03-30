const express = require('express');
const router = express.Router();
const photographersCtrl = require('../controllers/photographers');
const isLoggedIn = require('../config/auth');

router.get('/photographers/new', isLoggedIn, photographersCtrl.new);
router.post('/photographers', isLoggedIn, photographersCtrl.create);
router.post('/photos/:photoId/photographers', isLoggedIn, photographersCtrl.addToPhotographer)

module.exports = router;