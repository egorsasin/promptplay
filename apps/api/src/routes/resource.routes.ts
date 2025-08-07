import { Router } from 'express';
import { ResourceController } from '../controllers/resource.controller';

const router = Router();

// GET /api/resources/available - Get only available resources (must be before /:id route)
router.get('/available', ResourceController.getAvailableResources);

// GET /api/resources/type/:type - Get resources by type (must be before /:id route)
router.get('/type/:type', ResourceController.getResourcesByType);

// GET /api/resources - Get all resources with optional filtering
router.get('/', ResourceController.getAllResources);

// GET /api/resources/:id - Get resource by ID
router.get('/:id', ResourceController.getResourceById);

// POST /api/resources - Create new resource
router.post('/', ResourceController.createResource);

// PUT /api/resources/:id - Update existing resource
router.put('/:id', ResourceController.updateResource);

// DELETE /api/resources/:id - Delete resource
router.delete('/:id', ResourceController.deleteResource);

export default router;