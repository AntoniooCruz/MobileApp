const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    company_id: String,
    name: String,
    price: String,
    is_available: Boolean,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Product', ProductSchema);