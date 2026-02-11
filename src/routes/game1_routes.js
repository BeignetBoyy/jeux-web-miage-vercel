// src/routes/game1_routes.js

import express from 'express';
import * as controller from '../controllers/game1_controller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kartingPath = path.join(__dirname, '..', '..', 'games', 'karting');

router.use('/styles', express.static(path.join(kartingPath, 'styles')));
router.use('/scripts', express.static(path.join(kartingPath, 'js')));
router.use('/assets', express.static(path.join(kartingPath, 'assets')));

router.get('/', controller.getMainPage);

export default router;
