const { body, validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const createProductValidationRules = () => {
  return [
    body('title').not().isEmpty(),
    body('description').isLength({ min: 5 }),
    body('imageUrl').not().isEmpty(),
    body('price').isNumeric(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs passed!', 422));
  }
  next();
};

module.exports = {
  createProductValidationRules,
  validate,
};
