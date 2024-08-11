class BookDetailsDTO {
    constructor({ id, name, score }) {
        this.id = id;
        this.name = name;
        this.score = score !== null ? score.toFixed(2).toString() : -1;
    }
}

module.exports = BookDetailsDTO;