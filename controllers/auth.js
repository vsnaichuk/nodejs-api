const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../util/async-handler');
const User = require('../models/User');
const HttpError = require('../models/http-error');

const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new HttpError(
      'Could not create user, email already exists.',
      422,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await createdUser.save();

  const token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    'super_secret_dont_share',
    { expiresIn: '1h' },
  );

  res.status(201).json({
    user: {
      id: createdUser.id,
      email: createdUser.email,
      token,
    },
    message: 'Successfully created new account',
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new HttpError(
      'Could not log you in, credentials seem to be wrong.',
      403,
    );
  }

  const isValidPassword = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isValidPassword) {
    throw new HttpError(
      'Invalid credentials, could not log you in.',
      403,
    );
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
    },
    'super_secret_dont_share',
    {
      expiresIn: '1h',
    },
  );

  res.status(200).json({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      token,
    },
    message: 'Logged in!',
  });
});

exports.signup = signup;
exports.login = login;
