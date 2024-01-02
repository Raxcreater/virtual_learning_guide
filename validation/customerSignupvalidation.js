

const Joi = require('joi');
const valid_schema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email().required(),
    // mobileNumber: Joi.number().required(),
    password: Joi.string().min(3).max(22).required(),
    // Country: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required()

})

module.exports = {
    valid_schema
}


// username: Joi.string()
//     .alphanum()
//     .min(3)
//     .max(30)
//     .required()