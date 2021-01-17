const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    company_id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    is_available: {type: Boolean, required: true},
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Product', ProductSchema);