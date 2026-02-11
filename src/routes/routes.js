// src/routes/routes.js

const express = require('express');
const homeController = require('../controllers/controller');
const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/login', homeController.getLoginPage);
router.get('/signup', homeController.getSignupPage);

module.exports = router;