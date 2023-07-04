const Project = require('../model/Project');

const getAllDomains = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'Project ID is required'});
    }
    const project = await Project.findOne({_id: req.body.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
    }
    res.json(project.domains);
}

const addDomain = async (req, res) => {
    if (!req?.body?.id || !req?.body?.domain) {
        return res.status(400).json({'message': 'Project ID and domainName are required'});
    }
    const project = await Project.findOne({_id: req.body.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
    }

    project.domains = project.domains? [...project.domains, {domainName: req?.body?.domain}]: [{domainName:req?.body?.domain}];
    const result = await project.save();
    res.json(result);
}

const deleteDomain = async (req, res) => {
    if (!req?.body?.id || !req?.body?.domain) {
        return res.status(400).json({'message': 'Project ID and domainName are required'});
    }
    const project = await Project.findOne({_id: req.body.id}).exec();
    if(!project) {
        return res.status(204).json({'message': `No project mathces ID ${req.body.id}`});
    }

    const exist = project.domains.some(d => d.domainName === req.body.domain);
    if(!exist) {
        return res.status(204).json({'message': `No doamin name mathces ${req.body.domain}`});
    }

    const newDomains = project.domains.filter(d => d.domainName !== req.body.domain);
    project.domains = newDomains;
    const result = await project.save();
    res.json(result);
}

module.exports = {
    getAllDomains,
    addDomain,
    deleteDomain
}