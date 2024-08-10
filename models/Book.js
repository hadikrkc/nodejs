const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('book', {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 10,
        },
    },
}, {
    timestamps: false,
});

module.exports = Book;
