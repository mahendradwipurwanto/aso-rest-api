import express from 'express';
import { searchAppStoreApp, getAppStoreAppInfo, competitorsAppStoreApp, getSuggestedKeywords } from '../libs/appStore.js';

const router = express.Router();

router.get('/search', async (req, res, next) => {
    try {
        const { query, limit } = req.query;

        const response = await searchAppStoreApp(query, limit);

        res.json({
            status: 'ok',
            data: response

        });
        // res.json({
        //     status: 'ok',
        //     data: response,
        // });

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
        const { id } = req.query;

        const response = await getAppStoreAppInfo(id);

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
        const { id } = req.query;

        const response = await competitorsAppStoreApp(id);

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
router.get('/suggest-keywords', async (req, res) => {
    try {
        const { term } = req.query;

        // Memanggil fungsi getSuggestedKeywords dari service
        const suggestions = await getSuggestedKeywords(term);

        // Kirimkan hasilnya sebagai JSON
        res.json({
            status: 'ok',
            data: suggestions,
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
