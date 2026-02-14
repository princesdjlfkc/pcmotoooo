const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    brand: String,
    price: Number,
    tier: String,
    specs: String,
    image: String,
    perf: Number,
    tdp: Number,
    socket: String,
    memory: String,
    length: Number,
    wattage: Number,
    efficiency: String,
    inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);