const express = require('express');
const router = express.Router();
const {
    createBuild,
    getBuilds,
    getBuild,
    deleteBuild
} = require('../controllers/buildController');
const { protect } = require('../middleware/auth');

// POST /api/builds - Create a new build (protected)
// GET /api/builds - Get all user builds (protected)
router.route('/')
    .post(protect, createBuild)
    .get(protect, getBuilds);

// GET /api/builds/:id - Get single build (protected)
// DELETE /api/builds/:id - Delete build (protected)
router.route('/:id')
    .get(protect, getBuild)
    .delete(protect, deleteBuild);

module.exports = router;