const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');
const { validateBug, bugValidationRules } = require('../middlewares/validation');

// Get all bugs
router.get('/', async (req, res, next) => {
    try {
        const bugs = await Bug.find().sort({ createdAt: -1 });
        res.json(bugs);
    } catch (err) {
        next(err);
    }
});

// Create new bug
router.post('/', validateBug, async (req, res, next) => {
    try {
        const bug = new Bug(req.body);
        await bug.save();
        res.status(201).json(bug);
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;