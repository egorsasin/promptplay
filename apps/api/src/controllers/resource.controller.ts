import { Request, Response } from 'express';
import { ResourceModel } from '../models/resource.model';
import { ResourceFilters, CreateResourceRequest, UpdateResourceRequest, ResourceType } from '../types/resource.types';
import { createSuccessResponse, createErrorResponse, createNotFoundResponse } from '../utils/response.utils';

export class ResourceController {
  // GET /api/resources - Get all resources with optional filtering
  static async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const filters: ResourceFilters = {};

      // Parse query parameters for filtering
      if (req.query.type) {
        filters.type = req.query.type as ResourceType;
      }

      if (req.query.skill) {
        filters.skill = req.query.skill as string;
      }

      if (req.query.isAvailable !== undefined) {
        filters.isAvailable = req.query.isAvailable === 'true';
      }

      if (req.query.minCost) {
        filters.minCost = parseFloat(req.query.minCost as string);
      }

      if (req.query.maxCost) {
        filters.maxCost = parseFloat(req.query.maxCost as string);
      }

      if (req.query.minCapacity) {
        filters.minCapacity = parseFloat(req.query.minCapacity as string);
      }

      if (req.query.maxCapacity) {
        filters.maxCapacity = parseFloat(req.query.maxCapacity as string);
      }

      const resources = await ResourceModel.getAllResources(filters);
      
      res.json(createSuccessResponse(resources, `Found ${resources.length} resources`));
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json(createErrorResponse('Failed to fetch resources'));
    }
  }

  // GET /api/resources/:id - Get resource by ID
  static async getResourceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resource = await ResourceModel.getResourceById(id);

      if (!resource) {
        res.status(404).json(createNotFoundResponse('Resource'));
        return;
      }

      res.json(createSuccessResponse(resource));
    } catch (error) {
      console.error('Error fetching resource:', error);
      res.status(500).json(createErrorResponse('Failed to fetch resource'));
    }
  }

  // POST /api/resources - Create new resource
  static async createResource(req: Request, res: Response): Promise<void> {
    try {
      const resourceData: CreateResourceRequest = req.body;

      // Basic validation
      if (!resourceData.name || !resourceData.type || !resourceData.skill || resourceData.cost === undefined || resourceData.capacity === undefined) {
        res.status(400).json(createErrorResponse('Missing required fields: name, type, skill, cost, capacity'));
        return;
      }

      // Validate ResourceType enum
      if (!Object.values(ResourceType).includes(resourceData.type)) {
        res.status(400).json(createErrorResponse('Invalid resource type. Must be: person, hardware, or software'));
        return;
      }

      // Validate skill array
      if (!Array.isArray(resourceData.skill) || resourceData.skill.length === 0) {
        res.status(400).json(createErrorResponse('Skills must be a non-empty array'));
        return;
      }

      // Validate numeric fields
      if (resourceData.cost < 0) {
        res.status(400).json(createErrorResponse('Cost must be a positive number'));
        return;
      }

      if (resourceData.capacity <= 0) {
        res.status(400).json(createErrorResponse('Capacity must be a positive number'));
        return;
      }

      const newResource = await ResourceModel.createResource(resourceData);

      res.status(201).json(createSuccessResponse(newResource, 'Resource created successfully'));
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json(createErrorResponse('Failed to create resource'));
    }
  }

  // PUT /api/resources/:id - Update existing resource
  static async updateResource(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateResourceRequest = req.body;

      // Validate ResourceType enum if provided
      if (updateData.type && !Object.values(ResourceType).includes(updateData.type)) {
        res.status(400).json(createErrorResponse('Invalid resource type. Must be: person, hardware, or software'));
        return;
      }

      // Validate skill array if provided
      if (updateData.skill !== undefined) {
        if (!Array.isArray(updateData.skill) || updateData.skill.length === 0) {
          res.status(400).json(createErrorResponse('Skills must be a non-empty array'));
          return;
        }
      }

      // Validate numeric fields if provided
      if (updateData.cost !== undefined && updateData.cost < 0) {
        res.status(400).json(createErrorResponse('Cost must be a positive number'));
        return;
      }

      if (updateData.capacity !== undefined && updateData.capacity <= 0) {
        res.status(400).json(createErrorResponse('Capacity must be a positive number'));
        return;
      }

      const updatedResource = await ResourceModel.updateResource(id, updateData);

      if (!updatedResource) {
        res.status(404).json(createNotFoundResponse('Resource'));
        return;
      }

      res.json(createSuccessResponse(updatedResource, 'Resource updated successfully'));
    } catch (error) {
      console.error('Error updating resource:', error);
      res.status(500).json(createErrorResponse('Failed to update resource'));
    }
  }

  // DELETE /api/resources/:id - Delete resource
  static async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ResourceModel.deleteResource(id);

      if (!deleted) {
        res.status(404).json(createNotFoundResponse('Resource'));
        return;
      }

      res.json(createSuccessResponse(null, 'Resource deleted successfully'));
    } catch (error) {
      console.error('Error deleting resource:', error);
      res.status(500).json(createErrorResponse('Failed to delete resource'));
    }
  }

  // GET /api/resources/type/:type - Get resources by type
  static async getResourcesByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;

      // Validate ResourceType enum
      if (!Object.values(ResourceType).includes(type as ResourceType)) {
        res.status(400).json(createErrorResponse('Invalid resource type. Must be: person, hardware, or software'));
        return;
      }

      const resources = await ResourceModel.getResourcesByType(type as ResourceType);
      
      res.json(createSuccessResponse(resources, `Found ${resources.length} ${type} resources`));
    } catch (error) {
      console.error('Error fetching resources by type:', error);
      res.status(500).json(createErrorResponse('Failed to fetch resources by type'));
    }
  }

  // GET /api/resources/available - Get only available resources
  static async getAvailableResources(req: Request, res: Response): Promise<void> {
    try {
      const resources = await ResourceModel.getAvailableResources();
      
      res.json(createSuccessResponse(resources, `Found ${resources.length} available resources`));
    } catch (error) {
      console.error('Error fetching available resources:', error);
      res.status(500).json(createErrorResponse('Failed to fetch available resources'));
    }
  }
}