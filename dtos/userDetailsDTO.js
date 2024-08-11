class UserDetailsDTO {
    constructor(user, pastBooks, presentBooks) {
        this.id = user.id;
        this.name = user.name;
        this.books = {
            past: pastBooks.map(borrowedBook => ({
                name: borrowedBook.book.name,
                userScore: borrowedBook.score
            })),
            present: presentBooks.map(borrowedBook => ({
                name: borrowedBook.book.name
            }))
        };
    }
}

module.exports = UserDetailsDTO;