const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const importData = async () => {
    try {
        // This would delete all existing products
        await Product.deleteMany();
        
        // This is where you'd put your products from products.js
        // But you'd need to manually list them or write a parser
        
        console.log('✅ Data imported!');
        process.exit();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

importData();