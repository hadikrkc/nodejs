const User = require('../models/User');

class UserRepository {
    async createUser(data) {
        return await User.create(data);
    }

    async findUserById(id) {
        return await User.findByPk(id);
    }

    async findAllUsers() {
        return await User.findAll();
    }
}

module.exports = new UserRepository();