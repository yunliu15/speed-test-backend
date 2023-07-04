const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controlers/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;