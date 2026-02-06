const express = require('express');
const { asyncHandler } = require('../middleware/errorHandler');
const router = express.Router();
const { getProductController } = require('../controllers/product-controller')

const products = [
    {
        id: 1,
        name: "item 1"
    },
    {
        id: 2,
        name: "item 2"
    },
    {
        id: 3,
        name: "item 3"
    }
    ,
    {
        id: 4,
        name: "item 4"
    }
    ,
    {
        id: 5,
        name: "item 5"
    }
    ,
    {
        id: 6,
        name: "item 6"
    }
    ,
    {
        id: 7,
        name: "item 7"
    }
    ,
    {
        id: 8,
        name: "item 8"
    }

]

router.get('/items', asyncHandler(async (req, res) => {
    res.json({products})
}))

router.post('/items', asyncHandler(async (req, res) => {
    if(!req.body.name){
        throw new APIError('Item name is required', 400);
    }

    const newItem = {
        id: products.length + 1,
        name: req.body.name
    }

    products.push(newItem)
    res.status(201).json(newItem)  
}))
module.exports = router