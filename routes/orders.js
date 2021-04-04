const express = require('express');

const {
  createOrderValidationRules,
  validate,
} = require('../util/validators');
const ordersControllers = require('../controllers/orders');

const router = express.Router();

router.post(
  '/',
  createOrderValidationRules(),
  validate,
  ordersControllers.createOrder,
);

module.exports = router;
