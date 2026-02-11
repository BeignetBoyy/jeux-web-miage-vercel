// src/routes/game1_routes.js

const express = require('express');
const controller = require('../controllers/game1_controller');
const router = express.Router();
const path = require('path');

const kartingPath = path.join(__dirname, '..', '..', 'games', 'karting');


router.use('/styles', express.static(path.join(kartingPath,'styles')));
router.use('/scripts', express.static(path.join(kartingPath,'js')));
router.use('/assets', express.static(path.join(kartingPath,'assets')));

router.get('/', controller.getMainPage);

module.exports = router;