const express = require('express');

const {
  createProductValidationRules,
  updateProductValidationRules,
  validate,
} = require('../util/validators');
const productsControllers = require('../controllers/products');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', productsControllers.getProducts);

router.post(
  '/',
  fileUpload.single('image'),
  createProductValidationRules(),
  validate,
  productsControllers.createProduct,
);

router.patch(
  '/:id',
  fileUpload.single('image'),
  updateProductValidationRules(),
  validate,
  productsControllers.updateProduct,
);

router.delete('/:id', productsControllers.deleteProduct);

module.exports = router;
