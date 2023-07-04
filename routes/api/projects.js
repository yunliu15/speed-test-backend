const express = require('express');
const router = express.Router();
const projectController = require('../../controlers/projectsController');

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createProject)
    .put(projectController.updateProject)
    .delete(projectController.deleteProject)

router.route('/:id').get(projectController.getProject);

module.exports = router;