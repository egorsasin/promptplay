import { Request, Response } from 'express';
import { ProjectModel } from '../models/project.model';
import { ProjectFilters, CreateProjectRequest, UpdateProjectRequest, ProjectStatus, ProjectPriority } from '../types/project.types';
import { createSuccessResponse, createErrorResponse, createNotFoundResponse } from '../utils/response.utils';

export class ProjectController {
  // GET /api/projects - Get all projects with optional filtering
  static getAllProjects(req: Request, res: Response) {
    try {
      const filters: ProjectFilters = {};

      // Parse query parameters for filtering
      if (req.query.startDate) {
        filters.startDate = req.query.startDate as string;
      }

      if (req.query.endDate) {
        filters.endDate = req.query.endDate as string;
      }

      if (req.query.minCost) {
        filters.minCost = parseFloat(req.query.minCost as string);
      }

      if (req.query.maxCost) {
        filters.maxCost = parseFloat(req.query.maxCost as string);
      }

      if (req.query.status) {
        filters.status = req.query.status as ProjectStatus;
      }

      if (req.query.priority) {
        filters.priority = req.query.priority as ProjectPriority;
      }

      const projects = ProjectModel.getAllProjects(filters);
      
      res.json(createSuccessResponse(projects, `Found ${projects.length} projects`));
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }

  // GET /api/projects/:id - Get project by ID
  static getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = ProjectModel.getProjectById(id);

      if (!project) {
        return res.status(404).json(createNotFoundResponse('Project'));
      }

      res.json(createSuccessResponse(project));
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }

  // POST /api/projects - Create new project
  static createProject(req: Request, res: Response) {
    try {
      const projectData: CreateProjectRequest = req.body;
      const newProject = ProjectModel.createProject(projectData);

      res.status(201).json(createSuccessResponse(newProject, 'Project created successfully'));
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }

  // PUT /api/projects/:id - Update existing project
  static updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: UpdateProjectRequest = req.body;

      const updatedProject = ProjectModel.updateProject(id, updateData);

      if (!updatedProject) {
        return res.status(404).json(createNotFoundResponse('Project'));
      }

      res.json(createSuccessResponse(updatedProject, 'Project updated successfully'));
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }

  // DELETE /api/projects/:id - Delete project
  static deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = ProjectModel.deleteProject(id);

      if (!deleted) {
        return res.status(404).json(createNotFoundResponse('Project'));
      }

      res.json(createSuccessResponse(null, 'Project deleted successfully'));
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }

  // GET /api/projects/stats - Get project statistics
  static getProjectStats(req: Request, res: Response) {
    try {
      const allProjects = ProjectModel.getAllProjects();
      
      const stats = {
        total: allProjects.length,
        byStatus: {
          active: allProjects.filter(p => p.status === ProjectStatus.ACTIVE).length,
          inactive: allProjects.filter(p => p.status === ProjectStatus.INACTIVE).length,
          completed: allProjects.filter(p => p.status === ProjectStatus.COMPLETED).length,
          onHold: allProjects.filter(p => p.status === ProjectStatus.ON_HOLD).length,
        },
        byPriority: {
          low: allProjects.filter(p => p.priority === ProjectPriority.LOW).length,
          medium: allProjects.filter(p => p.priority === ProjectPriority.MEDIUM).length,
          high: allProjects.filter(p => p.priority === ProjectPriority.HIGH).length,
          critical: allProjects.filter(p => p.priority === ProjectPriority.CRITICAL).length,
        },
        totalCost: allProjects.reduce((sum, project) => sum + project.cost, 0),
        averageCost: allProjects.length > 0 ? allProjects.reduce((sum, project) => sum + project.cost, 0) / allProjects.length : 0,
      };

      res.json(createSuccessResponse(stats, 'Project statistics retrieved successfully'));
    } catch (error) {
      console.error('Error fetching project stats:', error);
      res.status(500).json(createErrorResponse('Internal server error'));
    }
  }
}