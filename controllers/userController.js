const userService = require('../services/userService');

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next();
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userService.getAllUsers();
        if (!allUsers) {
            return next();
        }
        res.json(allUsers);
    } catch (error) {
        next(error);
    }
};