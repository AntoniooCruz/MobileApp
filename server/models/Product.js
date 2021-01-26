const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    company_id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    is_available: {type: Boolean, required: true},
    img: {type:String, default:""}
})

module.exports = mongoose.model('Product', ProductSchema);