const { body, param, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const validateCreateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];

const validateGetUserById = [
    param('id').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];

const validateBorrowBook = [
    param('id').isInt().withMessage('User ID must be an integer'),
    param('bookId').isInt().withMessage('Book ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];

const validateReturnBook = [
    param('id').isInt().withMessage('User ID must be an integer'),
    param('bookId').isInt().withMessage('Book ID must be an integer'),
    body('score').optional().isFloat({ min: 0, max: 10 }).withMessage('Score must be a float between 0 and 10'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];
const validateCreateBook = [
    body('name').notEmpty().withMessage('Name is required'),
    body('score').optional().isFloat({ min: 0, max: 10 }).withMessage('Score must be a float between 0 and 10'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];

const validateGetBookById = [
    param('id').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array().map(error => error.msg).join(', '), 400));
        }
        next();
    }
];


module.exports = {
    validateCreateUser,
    validateGetUserById,
    validateBorrowBook,
    validateReturnBook,
    validateCreateBook,
    validateGetBookById
};
