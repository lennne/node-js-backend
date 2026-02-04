const express = require('express');
const { createAuthorController, createBookController, getBookController } = require('../controller/book-controller');
const router = express();


router.post('/author', createAuthorController)
router.post('/', createBookController)
router.get('/:id', getBookController);

module.exports = router