const express = require('express');
const router = express.Router();
const testResultController = require('../../controlers/testResultController');

router.route('/')
      .get(testResultController.getResults)
      .post(testResultController.addResult);

module.exports = router;