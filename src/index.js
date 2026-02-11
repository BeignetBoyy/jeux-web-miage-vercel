import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './db/config.js';
import routes from './routes/routes.js';
import game1_routes from './routes/game1_routes.js';
import mongo_routes from './routes/mongo_routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/* recreate __dirname (not available in ES modules) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/views', express.static(path.join(__dirname, '..', 'public', 'views')));
app.use('/styles', express.static(path.join(__dirname, '..', 'public', 'styles')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'public', 'scripts')));
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

app.use("/", routes);
app.use("/karting", game1_routes);
app.use("/mongo", mongo_routes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
