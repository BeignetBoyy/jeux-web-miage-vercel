// src/routes/routes.js

import express from 'express';
import * as homeController from '../controllers/controller.js';

const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/login', homeController.getLoginPage);
router.get('/signup', homeController.getSignupPage);

export default router;
