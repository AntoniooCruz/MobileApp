const Joi = require('joi');


const companySchema = Joi.object().keys({
    username: Joi.string().required().max(20),
    password: Joi.string().required().min(6),
    name: Joi.string().required().max(20),
    phone_number: Joi.string().max(13),
  });


module.exports = { companySchema }