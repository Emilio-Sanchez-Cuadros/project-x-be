const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'access denied' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error: 'invalid token'})
    }
};

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
    schemaLogin,
    verifyToken
}