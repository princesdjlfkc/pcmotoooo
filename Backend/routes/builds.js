const express = require('express');
const router = express.Router();
const {
    createBuild,
    getBuilds,
    deleteBuild
} = require('../controllers/buildController');

router.post('/', createBuild);
router.get('/', getBuilds);
router.delete('/:id', deleteBuild);

module.exports = router;  // ← Make sure this is here!