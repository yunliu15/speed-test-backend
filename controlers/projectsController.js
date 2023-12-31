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
        const duplicate = await Project.findOne({projectName: req.body.projectName}).exec();
        if (!duplicate) {
            const result = await Project.create({
                "projectName": req.body.projectName
            });
            res.status(201).json(result);
        } else {
            return res.status(400).json({'message': `${req.body.projectName} already exists`})
        }
        
        
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const updateProject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    try {
        const project = await Project.findOne({_id: req.body.id}).exec();
        if(!project) {
            return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
        }
        if(req?.body?.projectName) project.projectName = req.body.projectName;
        const result = await project.save();
        res.json(result);
    } catch(err) {
        console.error(err);
    }
}

const deleteProject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    try {
        const project = await Project.findOne({_id: req.body.id}).exec();
        if(!project) {
            return res.status(400).json({'message': `No project mathces ID ${req.body.id}`});
        }
        const result = await project.deleteOne();
        res.json(result);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const getProject = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message': 'ID is required'});
    }
    try {
        const project = await Project.findOne({_id: req.params.id}).exec();
        if(!project) {
            return res.status(400).json({'message': `No project mathces ID ${req.params.id}`});
        }
        res.json(project);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
    
}

const getAllDomains = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message': 'Project ID is required'});
    }
    try {
        const project = await Project.findOne({_id: req.params.id}).exec();
        if(!project) {
            return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
        }
        res.json(project.domains);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const getDomain = async (req, res) => {
    if (!req?.params?.id || !req?.params?.domainid) {
        return res.status(400).json({'message': 'Project ID and Domain ID are required'});
    }
    const id = req.params.id;
    const domainId = req.params.domainid;
    try {
        const project = await Project.findOne({_id: id}).exec();
        if (!project) {
            return res.status(400).json({'message': `No project mathces ID ${id}`});
        }
        const domain = project.domains.find(d=>d._id == domainId);
        if(!domain) {
            return res.status(400).json({'message': `No domain mathces ID ${domainId}`});
        }
        res.json(domain);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const addDomain = async (req, res) => {
    if (!req?.params?.id || !req?.body?.domain) {
        return res.status(400).json({'message': 'Project ID and domainName are required'});
    }
    try {
        const result = await Project.findOneAndUpdate(
            { _id: req.params.id, "domains.domainName":{$ne: req.body.domain} }, 
            { $push: { domains: {domainName: req.body.domain} } }, 
            { new: true }
        ).exec();
        if (!result) return res.sendStatus(204);
        res.json(result);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const deleteDomain = async (req, res) => {console.log(req.body)
    if (!req?.params?.id || !req?.params?.domainid) {
        return res.status(400).json({'message': 'Project ID and domainName are required'});
    }
    try {
        const result = await Project.findOneAndUpdate(
            { _id: req.params.id }, 
            { $pull: { domains: {_id: req.params.domainid} } }, 
            { new: true }
        ).exec(); 
        if (!result) return res.sendStatus(204);
        res.json(result);
    } catch(err) {
        console.error(err);
        res.sendStatus(400);
    }
}

module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getAllDomains,
    addDomain,
    deleteDomain,
    getDomain
}