const userService = require('../services/userService');
const bookService = require('../services/bookService');
const borrowedBookService = require('../services/borrowedBookService');

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next();
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (!allUsers) {
            return next();
        }
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
};

exports.borrowBook = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next();
        }
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next();
        }
        const borrowedBook = await borrowedBookService.createBorrowedBook(
            {
                user_id: req.params.id,
                book_id:req.params.bookId,
                borrow_date:new Date()
            });
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

exports.returnBook = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next();
        }
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next();
        }

        const borrowedBook = await borrowedBookService.findBorrowedBookByUserIdAndBookId(req.params.id,req.params.bookId);
        if (!borrowedBook) {
            return res.status(404).json({ message: 'Borrowed book not found or already returned.' });
        }

        const updateData = {
            ...req.body,
            return_date: new Date(),
        };
        
        const updateBorrowedBook = await borrowedBookService.updateBorrowedBook(borrowedBook, updateData);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};