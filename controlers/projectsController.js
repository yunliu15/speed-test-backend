const Project = require('../model/Project');

const getAllProjects = async (req, res) => {
    const projects = await Project.find();
    if (!projects) return res.status(204).json({'message': 'No projects found.'});
    res.json(projects);
}

const createProject = async (req, res) => {
    if(!req?.body?.projectName) {
        return res.status(400).json({'message': 'Project name is required.'})
    }
    try {
        const result = await Project.create({
            "projectName": req.body.projectName
        });
        res.status(201).json(result);
    } catch(err) {
        console.error(err);
    }
}

const updateProject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    const project = await Project.findOne({_id: req.body.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
    }
    if(req?.body?.projectName) project.projectName = req.body.projectName;
    const result = await project.save();
    res.json(result);
}

const deleteProject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    const project = await Project.findOne({_id: req.body.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
    }
    const result = await project.deleteOne();
    res.json(result);
}

const getProject = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    const project = await Project.findOne({_id: req.params.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.params.id}`});
    }
    res.json(project);
}

module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject
}