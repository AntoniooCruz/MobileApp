const Joi = require('joi');


const productSchema = Joi.object().keys({
    company_id: Joi.string().required(),
    price: Joi.number().required(),
    name: Joi.string().required().max(20),
    is_available: Joi.boolean().required(),
    img: Joi.any(),
  });


module.exports = { productSchema, }