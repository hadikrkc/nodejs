const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("deneme", "root", "mysql1234", {
    host: "localhost",
    dialect: 'mysql',
});

module.exports = sequelize;