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

    async updateBook(book, data) {
        return await book.update(data);
    }
}

module.exports = new BookRepository();