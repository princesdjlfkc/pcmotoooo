const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        category: String
    }],
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Build', buildSchema);