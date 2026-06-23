"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.createProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const getProjects = async (req, res) => {
    try {
        const projects = await Project_1.default.find({ owner: req.user._id }).sort({ updatedAt: -1 });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProjects = getProjects;
const createProject = async (req, res) => {
    try {
        const { title, pages, defaultPageId } = req.body;
        const projectData = {
            title: title || 'Untitled Project',
            owner: req.user._id
        };
        if (pages)
            projectData.pages = pages;
        if (defaultPageId)
            projectData.defaultPageId = defaultPageId;
        const project = new Project_1.default(projectData);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProject = createProject;
const getProjectById = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (project) {
            if (project.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to view this project' });
            }
            res.json(project);
        }
        else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (project) {
            if (project.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this project' });
            }
            project.title = req.body.title || project.title;
            project.defaultPageId = req.body.defaultPageId || project.defaultPageId;
            if (req.body.pages) {
                project.pages = req.body.pages;
            }
            project.thumbnail = req.body.thumbnail || project.thumbnail;
            const updatedProject = await project.save();
            res.json(updatedProject);
        }
        else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (project) {
            if (project.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to delete this project' });
            }
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        }
        else {
            res.status(404).json({ message: 'Project not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=projectController.js.map