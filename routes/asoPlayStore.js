import express from 'express';
import {
    searchPlayStoreApp,
    getPlayStoreAppInfo,
    competitorsPlayStoreApp,
    searchPlayStoreTargetedKeywords,
    getOffPageMatrix, getOnPageMatrix
} from '../libs/playStore.js';

const router = express.Router();

router.get('/search', async (req, res, next) => {
    try {
        const {query, limit} = req.query;

        const response = await searchPlayStoreApp(query, limit);
        res.json({
            status: 'ok',
            data: response
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});

router.get('/app-info', async (req, res, next) => {
    try {
        const {id} = req.query;

        const response = await getPlayStoreAppInfo(id);

        res.json({
            status: 'ok',
            data: response,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});

router.get('/competitors', async (req, res, next) => {
    try {
        const {id} = req.query;

        const response = await competitorsPlayStoreApp(id);

        res.json({
            status: 'ok',
            data: response,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});

router.get('/search-google-play-keywords', async (req, res) => {
    try {
        const {query, limit} = req.query;
        const response = await searchPlayStoreTargetedKeywords(query, limit);

        res.json({
            status: 'ok',
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});

router.get('/on-page', async (req, res) => {
    try {
        const {id} = req.query;
        const response = await getOnPageMatrix(id);

        res.json({
            status: 'ok',
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});

router.get('/off-page', async (req, res) => {
    try {
        const {id} = req.query;
        const response = await getOffPageMatrix(id);

        res.json({
            status: 'ok',
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
});


export default router;