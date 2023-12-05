const Joi = require("@hapi/joi");

const schemaRegister = Joi.object({
    username: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string(),
    status: Joi.string()
});

const schemaLogin = Joi.object({
    username: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
    schemaRegister,
    schemaLogin
}