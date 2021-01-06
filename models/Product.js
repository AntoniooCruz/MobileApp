const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    company_id: String,
    price: Number,
    is_available: Boolean,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Product', ProductSchema);