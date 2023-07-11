const express = require('express');
const router = express.Router();
const testResultController = require('../../controlers/testResultController');

router.route('/').post(testResultController.addResult);

router.route('/:projectid/:domainid').get(testResultController.getResults)

module.exports = router;