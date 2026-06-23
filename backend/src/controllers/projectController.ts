import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ owner: (req as any).user._id }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, pages, defaultPageId } = req.body;
    const projectData: any = {
      title: title || 'Untitled Project',
      owner: (req as any).user._id
    };
    if (pages) projectData.pages = pages;
    if (defaultPageId) projectData.defaultPageId = defaultPageId;
    
    const project = new Project(projectData);
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      if (project.owner.toString() !== (req as any).user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this project' });
      }
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      if (project.owner.toString() !== (req as any).user._id.toString()) {
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
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      if (project.owner.toString() !== (req as any).user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this project' });
      }
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
