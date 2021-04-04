const mongoose = require('mongoose');
const asyncHandler = require('../util/async-handler');
const Product = require('../models/Product');
const HttpError = require('../models/http-error');

const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, imageUrl, price } = req.body;

  const createdProduct = new Product({
    title,
    description,
    imageUrl,
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
    throw new HttpError('Could not find products', 404);
  }

  res.status(201).json({
    products: products.map((p) => p.toObject({ getters: true })),
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    throw new HttpError(
      'Could not find product for the provided id',
      404,
    );
  }

  product.title = title;
  product.description = description;
  product.imageUrl = imageUrl;

  await product.save();

  res.status(200).json({
    product: product.toObject({ getters: true }),
    message: 'Successfully updated',
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new HttpError(
      'Could not find product for the provided id',
      404,
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await product.deleteOne({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, deleting Product failed, please try again later',
        500,
      ),
    );
  }

  res.status(200).json({
    message: 'Successfully deleted',
  });
});

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
