const bookRepository = require('../repositories/bookRepository');

class BookService {
    async createBook(data) {
        return await bookRepository.createBook(data);
    }

    async getBookById(id) {
        return await bookRepository.findBookById(id);
    }
    
    async getAllBooks() {
        return await bookRepository.findAllBooks();
    }

    async updateBook(book, data) {
        return await bookRepository.updateBook(book, data);
    }
    
}

module.exports = new BookService();