const express = require('express');
const router = express.Router();
const domainsController = require('../../controlers/domainsController');


router.route('/')
    .get(domainsController.getAllDomains)
    .put(domainsController.addDomain)
    .delete(domainsController.deleteDomain)


module.exports = router;