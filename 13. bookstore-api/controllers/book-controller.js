const Book = require('../models/Book');

const getAllBooks = async(req, res) => {
    try{
        const allBooks = await Book.find();
        if(allBooks?.length > 0){
            return res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                data: allBooks
            })
    } else {
        return res.status(404).json({
            success: false,
            message: "Books not found",
        })
    }
    }catch(error){
    console.log("Error getting all books -> ", error);
    res.status(500).json({
        success: false,
        message: 'Server Error. Please try again later.'
    })
    }
}

const getBookById = async(req, res) => {
    try{
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if(book){
            return res.status(200).json({
                success: true,
                message: 'Book retrieved successfully',
                data: book
            
            })
        }else {
                return res.status(404).json({
                    success: false,
                    message: "Book not found"
                })
            }
    }catch(error){
        console.log("Error getting all books -> ", error);
        res.status(500).json({
        success: false,
        message: 'Server Error. Please try again later.'
    })
    }
}

const addBook = async(req, res) => {
    try{ 
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newlyCreatedBook){
            return res.status(201).json({
                success: true,
                message: 'Book added successfully',
                data: newlyCreatedBook
            })
        }
    }catch(error){
        console.log(e);
    }
   
}

const updateBook = async(req, res) => {
    try{
        const bookId = req.params.id;
        const updateBookData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookId, updateBookData, { new: true});

        if(updatedBook){
            return res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            })
        }else {

            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
            
        }
    }catch(error){
         console.log("Error getting all books -> ", error);
        res.status(500).json({
        success: false,
        message: 'Server Error. Please try again later.'
    })
    }
}

const deleteBook = async(req, res) => {
    try{
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if(deletedBook){
            return res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: deletedBook
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
    }catch(error){
         console.log("Error getting all books -> ", error);
        res.status(500).json({
        success: false,
        message: 'Server Error. Please try again later.'
    })
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}