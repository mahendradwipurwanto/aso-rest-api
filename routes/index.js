import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    return res.json({
        data: "Google ASO API Sequence",
        author: "mahendradwipurwanto@gmail.com"
    });
});

export default router;