const express = require('express');

const {
  signupValidationRules,
  loginValidationRules,
  validate,
} = require('../util/validators');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  signupValidationRules(),
  validate,
  authControllers.signup,
);

router.post(
  '/login',
  loginValidationRules(),
  validate,
  authControllers.login,
);

module.exports = router;
