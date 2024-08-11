const bookRepository = require('../repositories/bookRepository');
const userRepository = require('../repositories/userRepository');
const borrowedBookRepository = require('../repositories/borrwedBookRepository');

class BorrowedBookService {
    async createBorrowedBook(data) {
        return await borrowedBookRepository.createBorrowedBook(data);
    }

    async getBorrowedBookById(id) {
        return await borrowedBookRepository.findBorrowedBookById(id);
    }
    
    async getAllBorrowedBooks() {
        return await borrowedBookRepository.findAllBorrowedBooks();
    }
    
    async findBorrowedBookByUserIdAndBookId(userId, bookId) {
        return await borrowedBookRepository.findBorrowedBookByUserIdAndBookId(userId, bookId);
    }

    async updateBorrowedBook(borrowedBook, data) {
        return await borrowedBookRepository.updateBorrowedBook(borrowedBook, data);
    }

    async getPastBooksForUser(userId) {
        return await borrowedBookRepository.getPastBooksForUser(userId);
    }

    async getPresentBooksForUser(userId) {
        return await borrowedBookRepository.getPresentBooksForUser(userId);
    }

}

module.exports = new BorrowedBookService();