const express = require('express');
const router = express.Router();
const logoutController = require('../controlers/logoutController');

router.get('/', logoutController.handleLogout);

module.exports = router;