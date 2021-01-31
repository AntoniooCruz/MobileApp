const Joi = require('joi');


const updatePasswordSchema = Joi.object().keys({
    id: Joi.string(),
    username: Joi.string().required().max(20),
    old_password: Joi.string().required().min(6),
    new_password: Joi.string().required().min(6),
    name: Joi.string().required().max(20),
    phone_number: Joi.string().max(13),
    description: Joi.any(),
    img: Joi.any(),
    is_admin: Joi.boolean().required()

  });


module.exports = { updatePasswordSchema }