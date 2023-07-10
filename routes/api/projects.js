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
router.route('/:id/domains').put(projectsController.addDomain); // add a new domain
router.route('/:id/domains/delete').put(projectsController.deleteDomain); // delelte a domain

module.exports = router;