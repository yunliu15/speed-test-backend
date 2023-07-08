const express = require('express');
const router = express.Router();
const projectsController = require('../../controlers/projectsController');

router.route('/')
    .get(projectsController.getAllProjects)
    .post(projectsController.createProject)
    .put(projectsController.updateProject)
    .delete(projectsController.deleteProject)

router.route('/:id').get(projectsController.getProject);

router.route('/:id/domains').get(projectsController.getAllDomains);
router.route('/:id/domains').put(projectsController.addDomain);
router.route('/:id/:domainid').put(projectsController.deleteDomain);

module.exports = router;