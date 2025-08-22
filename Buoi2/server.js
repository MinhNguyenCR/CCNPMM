import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import db from './config/config.json' assert { type: 'json' };
import initWebRoutes from './routes/web.js';
import connectDB from './config/configdb.js';
import dotenv from 'dotenv';
dotenv.config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});