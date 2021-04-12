const { body, validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const signupValidationRules = () => {
  return [
    body('name').isLength({ min: 5 }),
    body('email').normalizeEmail().isEmail(),
    body('password').isLength({ min: 5 }),
  ];
};

const loginValidationRules = () => {
  return [
    body('email').normalizeEmail().isEmail(),
    body('password').isLength({ min: 5 }),
  ];
};

const createProductValidationRules = () => {
  return [
    body('title').isLength({ min: 5 }),
    body('descr').isLength({ min: 10 }),
    body('price').isNumeric(),
  ];
};

const updateProductValidationRules = () => {
  return [
    body('title').isLength({ min: 5 }),
    body('descr').isLength({ min: 10 }),
  ];
};

const createOrderValidationRules = () => {
  return [
    body('orderItems').not().isEmpty(),
    body('totalAmount').isNumeric(),
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
  signupValidationRules,
  loginValidationRules,
  createProductValidationRules,
  updateProductValidationRules,
  createOrderValidationRules,
  validate,
};
