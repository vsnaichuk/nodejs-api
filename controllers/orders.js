const asyncHandler = require('../util/async-handler');
const Order = require('../models/Order');
const HttpError = require('../models/http-error');

const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, totalAmount } = req.body;

  const createdOrder = new Order({
    orderItems,
    totalAmount,
    creator: 'u1', //TODO req.userData.userId (implement user auth)
    date: new Date().toISOString(),
  });

  await createdOrder.save();

  res.status(201).json({
    order: createdOrder.toObject({ getters: true }),
    message: 'Successfully created new order',
  });
});

exports.createOrder = createOrder;
