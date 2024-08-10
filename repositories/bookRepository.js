const Book = require('../models/Book');

class BookRepository {
    async createBook(data) {
        return await Book.create(data);
    }

    async findBookById(id) {
        return await Book.findByPk(id);
    }

    async findAllBooks() {
        return await Book.findAll();
    }
}

module.exports = new BookRepository();