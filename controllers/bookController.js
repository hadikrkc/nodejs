const bookService = require('../services/bookService');
const BookDTO = require('../dtos/bookDTO');

exports.createBook = async (req, res, next) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) {
            return next();
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const allBooks = await bookService.getAllBooks();
        if (!allBooks) {
            return next();
        }
        
        const bookDTOs = allBooks.map(book => new BookDTO(book));
        res.json(bookDTOs);
    } catch (error) {
        next(error);
    }
};