const Joi = require('joi');


const productSchema = Joi.object().keys({
    company_id: Joi.string().required(),
    price: Joi.string().required(),
    name: Joi.string().required().max(20),
    is_available: Joi.boolean().required(),
  });


module.exports = { productSchema, }