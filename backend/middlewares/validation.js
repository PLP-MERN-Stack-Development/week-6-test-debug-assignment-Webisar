const { validationResult } = require('express-validator');

const validateBug = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const bugValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
    ];
};

module.exports = {
    validateBug,
    bugValidationRules
};