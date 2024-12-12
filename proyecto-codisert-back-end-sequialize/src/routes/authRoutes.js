const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta de login
router.post('/login', authController.login);

module.exports = router;