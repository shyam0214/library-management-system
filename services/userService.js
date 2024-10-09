const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const userService = {
    registerUser: async (data) => {
        return await User.create(data);
    },

    getUserByEmail: async (email) => {
       
        return await User.findOne({email: email });
    },

    getUserById: async (id) => {
        return await User.findById(id);
    },

    getAllUsers: async (pagination) => {
        return await User.find()
            .limit(pagination.limit)
            .skip(pagination.skip);
    },

    updateUser: async (id, data) => {
        return await User.findByIdAndUpdate(id, data, { new: true });
    },

    deleteUser: async (id) => {
        return await User.findByIdAndDelete(id);
    },

    comparePassword: async (inputPassword, userPassword) => {
        return await bcrypt.compare(inputPassword, userPassword);
    },

    generateToken: (user) => {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
};

module.exports = userService;
