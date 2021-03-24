const express = require('express');

const {
  createProductValidationRules,
  updateProductValidationRules,
  validate,
} = require('../util/validators');
const productsControllers = require('../controllers/products');

const router = express.Router();

router.get('/', productsControllers.getProducts);

router.post(
  '/',
  // fileUpload.single('image'),
  createProductValidationRules(),
  validate,
  productsControllers.createProduct,
);

router.patch(
  '/:id',
  updateProductValidationRules(),
  validate,
  productsControllers.updateProduct,
);

module.exports = router;
