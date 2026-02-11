const express = require('express');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./db/config');
const routes = require('./routes/routes');
const game1_routes = require('./routes/game1_routes');
const mongo_routes = require('./routes/mongo_routes');

app.use(express.json())

app.use('/views', express.static(path.join(__dirname, '..','public','views')));
app.use('/styles', express.static(path.join(__dirname, '..','public','styles')));
app.use('/scripts', express.static(path.join(__dirname, '..','public','scripts')));
app.use('/assets', express.static(path.join(__dirname, '..','public','assets')));


app.use("/", routes);
app.use("/karting", game1_routes);
app.use("/mongo", mongo_routes);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servicer is Running on http://localhost:${port}`)
    });
})