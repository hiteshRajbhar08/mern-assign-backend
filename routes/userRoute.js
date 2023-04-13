const router = require('express').Router();
const { loginUser, registerUser } = require('../controllers/userController');

// /api/users/login
router.route('/login').post(loginUser);

// /api/users/register
router.route('/register').post(registerUser);

module.exports = router;
