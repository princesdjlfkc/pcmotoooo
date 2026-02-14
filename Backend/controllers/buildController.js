const Build = require('../models/Build');

const createBuild = async (req, res) => {
    try {
        const build = await Build.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(build);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBuilds = async (req, res) => {
    try {
        const builds = await Build.find({ user: req.user._id });
        res.json(builds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBuild = async (req, res) => {
    try {
        await Build.findByIdAndDelete(req.params.id);
        res.json({ message: 'Build deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBuild,
    getBuilds,
    deleteBuild
};