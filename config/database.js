const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
// });

// module.exports = sequelize;

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
        });

        Database.instance = this;
    }

    getSequelizeInstance() {
        return this.sequelize;
    }
}

module.exports = new Database();