const asyncHandler = require('../util/async-handler');
const Product = require('../models/Product');
const HttpError = require('../models/http-error');

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
    product: createdProduct.toObject({ getters: true }),
    message: 'Successfully added a new product',
  });
});

const getProducts = asyncHandler(async (req, res, next) => {

  const products = await Product.find({});

  if (!products || products.length === 0) {
    throw new HttpError(
      'Could not find products',
      404,
    );
  }

  res.status(201).json({
    products: products.map((p) => p.toObject({ getters: true })),
  });
});

exports.createProduct = createProduct;
exports.getProducts = getProducts;
