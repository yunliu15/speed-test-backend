const express = require('express');
const router = express.Router();
const projectsController = require('../../controlers/projectsController');

router.route('/')
    .get(projectsController.getAllProjects)
    .post(projectsController.createProject)
    .put(projectsController.updateProject)
    .delete(projectsController.deleteProject)

router.route('/:id').get(projectsController.getProject);

module.exports = router;