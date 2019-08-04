const Joi = require('@hapi/joi');

const UserRegisterValid = (data) => {

    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: Joi.string().required().email({ minDomainSegments: 2 })
    }

    return Joi.validate(data, schema)
}


const UserLoginValid = (data) => {

    const schema = {
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    }

    return Joi.validate(data, schema)
}

module.exports.UserLoginValid = UserLoginValid
module.exports.UserRegisterValid = UserRegisterValid