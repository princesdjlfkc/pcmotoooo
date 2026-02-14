const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    addFavorite,
    removeFavorite
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// POST /api/users/register - Register new user
router.post('/register', registerUser);

// POST /api/users/login - Login user
router.post('/login', loginUser);

// GET /api/users/profile - Get user profile (protected)
router.get('/profile', protect, getUserProfile);

// POST /api/users/favorites - Add to favorites (protected)
router.post('/favorites', protect, addFavorite);

// DELETE /api/users/favorites/:productId - Remove from favorites (protected)
router.delete('/favorites/:productId', protect, removeFavorite);

module.exports = router;