const Joi = require('joi');

const registerUserSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
    }),
    role: Joi.string().valid('customer', 'author').required().messages({
        'any.only': 'Role must be either customer or author',
        'string.empty': 'Role is required',
    }),
});
const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    })
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});


const createBookSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
    }),
    author: Joi.string().required().messages({
        'string.empty': 'Author is required',
    }),
    ISBN: Joi.string().required().messages({
        'string.empty': 'ISBN is required',
    }),
    publishYear: Joi.number().integer().required().messages({
        'number.base': 'Publish year must be a number',
        'number.empty': 'Publish year is required',
    }),
    genre: Joi.string().required().messages({
        'string.empty': 'Genre is required',
    }),
});

const updateBookSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    ISBN: Joi.string(),
    publishYear: Joi.number().integer(),
    genre: Joi.string(),
});




module.exports = {loginUserSchema, registerUserSchema, updateUserSchema,createBookSchema, updateBookSchema };
