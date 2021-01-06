const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    client_id: String,
    company_id: String,
    product_id: String,
    message: String,
    location: String,
    is_fulfilled: Boolean,
})

module.exports = mongoose.model('Order', OrderSchema);