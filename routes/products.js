const express = require('express');

const {
  createProductValidationRules,
  validate,
} = require('../util/validators');
const productsControllers = require('../controllers/products');

const router = express.Router();

router.post(
  '/',
  // fileUpload.single('image'),
  createProductValidationRules(),
  validate,
  productsControllers.createProduct,
);

module.exports = router;
