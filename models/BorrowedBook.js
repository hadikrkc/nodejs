const { DataTypes } = require('sequelize');
const database = require('../config/database');
const sequelize = database.getSequelizeInstance();
const User = require('./User');
const Book = require('./Book');

const BorrowedBook = sequelize.define('borrowed_books', {
    borrow_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id',
        },
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATE,
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

BorrowedBook.belongsTo(Book, { foreignKey: 'book_id' });
BorrowedBook.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BorrowedBook;
