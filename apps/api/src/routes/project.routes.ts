import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = Router();

// GET /api/projects/stats - Get project statistics (must be before /:id route)
router.get('/stats', ProjectController.getProjectStats);

// GET /api/projects - Get all projects with optional filtering
router.get('/', ProjectController.getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', ProjectController.getProjectById);

// POST /api/projects - Create new project
router.post('/', ProjectController.createProject);

// PUT /api/projects/:id - Update existing project
router.put('/:id', ProjectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', ProjectController.deleteProject);

export default router;