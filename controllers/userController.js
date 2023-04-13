const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/users/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: 'Invalid email or password',
    });
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/user/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
const registerUser = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/:id
 * @method  GET
 * @access  private
 ------------------------------------------------*/
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({
      message: 'User not found',
    });
  }
});

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
};
