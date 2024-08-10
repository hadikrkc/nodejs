const userRepository = require('../repositories/userRepository');

class UserService {
    async createUser(data) {
        return await userRepository.createUser(data);
    }

    async getUserById(id) {
        return await userRepository.findUserById(id);
    }
    
    async getAllUsers() {
        return await userRepository.findAllUsers();
    }
    
}

module.exports = new UserService();