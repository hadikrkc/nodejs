const { Op } = require('sequelize');
const BorrowedBook = require('../models/BorrowedBook');
const Book = require('../models/Book');

class BorrowedBookRepository {
    async createBorrowedBook(data) {
        return await BorrowedBook.create(data);
    }

    async findBorrowedBookById(id) {
        return await BorrowedBook.findByPk(id);
    }

    async findAllBorrowedBooks() {
        return await BorrowedBook.findAll();
    }

    async findBorrowedBookByUserIdAndBookId(userId, bookId) {
        return await BorrowedBook.findOne({
            where: {
                user_id: userId,
                book_id: bookId,
                return_date: {
                    [Op.is]: null,
                },
            },
        });
    }
    
    async updateBorrowedBook(borrowedBook, data) {
        return await borrowedBook.update(data);
    }

    async getPastBooksForUser(userId) {
        return await BorrowedBook.findAll({
            where: { user_id: userId, return_date: { [Op.ne]: null }},
            include: [
                {
                    model: Book,
                    attributes: ['name'],
                }
            ] 
        });
    }

    async getPresentBooksForUser(userId) {
        return await BorrowedBook.findAll({
            where: { user_id : userId, return_date: null },
            include: [
                {
                    model: Book,
                    attributes: ['name'],
                }
            ]
        });
    }
}

module.exports = new BorrowedBookRepository();