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
    
}

module.exports = new BookService();