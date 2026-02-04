const Author = require('../models/Author')
const Book = require('../models/Book')

const createAuthorController = async (req, res) => {
    try {
        const author = req.body;
        const newAuthor = Author(author)
        await newAuthor.save()
        return res.status(200).json({
            success: true,
            message: "Successfully added Author",
            data: newAuthor
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const createBookController = async (req, res) => {
    try{
        const book = req.body;
        const newBook = await Book(book)
        await newBook.save()

        return res.status(200).json({
            success: true,
            message: "Created Book successfully",
            data: newBook
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getBookController = async (req, res) => {
    try{
        const bookId = req.params.id;
        const newBook = await Book.findById(bookId).populate('author')

        return res.status(200).json({
            success: true,
            message: "Retrieved Book successfully",
            data: newBook
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


module.exports = { createAuthorController, createBookController, getBookController}