import express from 'express';
import { searchPlayStoreApp, getPlayStoreAppInfo, competitorsPlayStoreApp, searchPlayStoreTargetedKeywords } from '../libs/playStore.js';

const router = express.Router();

router.get('/search', async (req, res, next) => {
    try {
        const { query, limit } = req.query;

        const response = await searchPlayStoreApp(query, limit);
        res.json({
            status: 'ok',
            data: response,
                matrix: {
                    appName: {
                        label: "good",
                        color: "green"
                    },
                    appSubtilte: {
                        label: "noot good",
                        color: "yellow"
                    },
                    appUrl: {
                        label: "noot good",
                        color: "yellow"
                    },
                    keywords: {
                        label: "noot good",
                        color: "yellow"
                    },
                    InstallEngagement: {
                        label: "noot good",
                        color: "yellow"
                    },
                    ReviewRatings: {
                        label: "noot good",
                        color: "yellow"
                    },
                    appUpdates: {
                        label: "noot good",
                        color: "yellow"
                    },
                    InAppPurchase: {
                        label: "noot good",
                        color: "yellow"
                    },


                }
            
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
        const { id } = req.query;

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
        const { id } = req.query;

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
        const { query, limit } = req.query;
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


export default router;