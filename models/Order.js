const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    client_id: {type: String, required: true},
    company_id: {type: String, required: true},
    product_id: {type: String, required: true},
    message: String,
    location: String,
    is_fulfilled: {type: Boolean, required: true},
})

module.exports = mongoose.model('Order', OrderSchema);