const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: String,
        model: Number,
        price: Number,
        category: String
    });

module.exports = mongoose.model('products', ProductSchema);