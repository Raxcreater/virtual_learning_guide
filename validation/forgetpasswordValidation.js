const Joi = require('joi');
const valid_schema = Joi.object({

    email: Joi.string().email().required(),
    password:Joi.string().required()})
    // name: Joi.string()
    //     .min(3)
    //     .max(30)
    //     .required(),
    module.exports = {
        valid_schema
    }