const Joi = require('joi');


const orderSchema = Joi.object().keys({
    company_id: Joi.string().required(),
    client_id: Joi.string().required(),
    product_id: Joi.string().required(),
    is_fulfilled: Joi.boolean().required(),
    message: Joi.string(),
    location: Joi.string(),
  });


module.exports = { orderSchema }