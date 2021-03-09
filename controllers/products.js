const asyncHandler = require('../util/async-handler');
const Product = require('../models/Product');

const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;

  const createdProduct = new Product({
    title,
    description,
    image: imageUrl,
    price,
  });

  await createdProduct.save();

  res.status(201).json({
    product: createdProduct,
    message: 'Successfully added a new product',
  });
});

exports.createProduct = createProduct;
