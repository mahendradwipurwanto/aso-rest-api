import express from 'express';

import indexRouter from './routes/index.js';
import asoPlayStoreRouter from './routes/asoPlayStore.js';
import asoAppStoreRouter from './routes/asoAppStore.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const corsOptions = {
    origin: "*",
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/api/play-store', asoPlayStoreRouter);
app.use('/api/app-store', asoAppStoreRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({ status: 'Not Found', message: "The requested URL was not found on the server" });
});

// Error handler
app.use((err, req, res, next) => {
    // Return JSON error with message
    res.status(500).json({ status: 'error', message: err.message });
});

// Start the Express server
app.listen(3000, () => {
    console.log(`Server is running on port: 3000`);
});
