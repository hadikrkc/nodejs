const bookService = require('../services/bookService');
const BookDTO = require('../dtos/bookDTO');
const BookDetailsDTO = require('../dtos/bookDetailsDTO');
const AppError = require('../utils/AppError');

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
            return next(new AppError('Book not found.', 404));
        }
        const bookDTO = new BookDetailsDTO(book);
        res.json(bookDTO);
    } catch (error) {
        next(error);
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const allBooks = await bookService.getAllBooks();
        if (!allBooks || allBooks.length === 0) {
            return res.json([]);
        }
        const bookDTOs = allBooks.map(book => new BookDTO(book));
        res.json(bookDTOs);
    } catch (error) {
        next(error);
    }
};