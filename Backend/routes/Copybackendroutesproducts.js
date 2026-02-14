const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// GET /api/products - Get all products
// POST /api/products - Create a product (admin only)
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// GET /api/products/:id - Get single product
// PUT /api/products/:id - Update product (admin only)
// DELETE /api/products/:id - Delete product (admin only)
router.route('/:id')
    .get(getProduct)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;