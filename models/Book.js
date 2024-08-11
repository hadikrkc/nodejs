const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    is_borrowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = Book;
