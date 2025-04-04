const express = require('express');
const router = express.Router();
const { register, login,getCurrentUser } = require('../controllers/authController');
const {jwtAuthMiddleware} = require('../middleware/auth');
router.post('/register', register);
router.post('/login', login);
router.get('/me',jwtAuthMiddleware,getCurrentUser);

module.exports = router;