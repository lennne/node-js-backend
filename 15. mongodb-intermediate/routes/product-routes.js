const express = require('express');
const { insertSampleProducts, getProductStats, getProductAnalysis } = require('../controller/product-controller');
const router = express.Router()

router.post('/', insertSampleProducts)
router.get('/', getProductStats);
router.get('/analysis', getProductAnalysis)

module.exports = router;