const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/book-controller');

//create express router
const router = express.Router();

//all the routes that are related to books only
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
