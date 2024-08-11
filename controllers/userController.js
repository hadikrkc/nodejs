const userService = require('../services/userService');
const bookService = require('../services/bookService');
const borrowedBookService = require('../services/borrowedBookService');
const UserDTO = require('../dtos/UserDTO');
const UserDetailsDTO = require('../dtos/userDetailsDTO');
const AppError = require('../utils/AppError');

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
            return next(new AppError('User not found.', 404));
        }

        const pastBooks = await borrowedBookService.getPastBooksForUser(req.params.id);
        const presentBooks = await borrowedBookService.getPresentBooksForUser(req.params.id);

        const userDetailsDTO = new UserDetailsDTO(user, pastBooks, presentBooks);

        res.json(userDetailsDTO);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (!allUsers || allUsers.length === 0) {
            return res.json([]);
        }
        const userDTOs = allUsers.map(user => new UserDTO(user));
        res.json(userDTOs);
    } catch (error) {
        next(error);
    }
};

exports.borrowBook = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(new AppError('User not found.', 404));
        }
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next(new AppError('Book not found.', 404));
        }
        if (book.is_borrowed){
            return next(new AppError('Book has been borrowed.', 404));
        }
        const borrowedBook = await borrowedBookService.createBorrowedBook(
            {
                user_id: req.params.id,
                book_id:req.params.bookId,
                borrow_date:new Date()
            });

        const updateBookData = {
            is_borrowed: true
        };

        const updateBook = await bookService.updateBook(book, updateBookData);

        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

exports.returnBook = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(new AppError('User not found.', 404));
        }
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next(new AppError('Book not found.', 404));
        }

        const borrowedBook = await borrowedBookService.findBorrowedBookByUserIdAndBookId(req.params.id,req.params.bookId);
        if (!borrowedBook) {
            return next(new AppError('Borrowed book not found or already returned.', 404));
        }

        const updateBorrowedBookData = {
            ...req.body,
            return_date: new Date(),
        };
        
        const updateBorrowedBook = await borrowedBookService.updateBorrowedBook(borrowedBook, updateBorrowedBookData);

        const updateBookData = {
            total_score: book.total_score + req.body.score,
            rating_count: book.rating_count + 1,
            is_borrowed: false
        };

        const updateBook = await bookService.updateBook(book, updateBookData);

        res.status(204).json();
    } catch (error) {
        next(error);
    }
};