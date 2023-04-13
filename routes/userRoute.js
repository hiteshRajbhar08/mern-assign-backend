const router = require('express').Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
} = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

// /api/users/login
router.route('/login').post(loginUser);

// /api/users/register
router.route('/register').post(registerUser);

// /api/users/:id
router.route('/:id').get(protect, getUserProfile);

module.exports = router;
