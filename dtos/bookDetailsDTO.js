class BookDetailsDTO {
    constructor({ id, name, total_score, rating_count}) {
        this.id = id;
        this.name = name;
        if (rating_count > 0) {
            const averageScore = total_score / rating_count;
            this.score = averageScore.toFixed(2).toString();
        } else {
            this.score = -1;
        }
    }
}

module.exports = BookDetailsDTO;