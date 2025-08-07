import { v4 as uuidv4 } from 'uuid';
import { Resource as ResourceEntity } from '../entities/Resource';
import { Resource, ResourceType, CreateResourceRequest, UpdateResourceRequest, ResourceFilters } from '../types/resource.types';
import { getEM, withTransaction } from '../utils/database.utils';
import { EntityManager } from '@mikro-orm/sqlite';

export class ResourceModel {
  static async getAllResources(filters?: ResourceFilters): Promise<Resource[]> {
    try {
      const em = getEM();
      const qb = em.createQueryBuilder(ResourceEntity, 'r');

      // Apply filters
      if (filters) {
        if (filters.type) {
          qb.andWhere('r.type = ?', [filters.type]);
        }

        if (filters.skill) {
          qb.andWhere('r.skill LIKE ?', [`%${filters.skill}%`]);
        }

        if (filters.isAvailable !== undefined) {
          qb.andWhere('r.isAvailable = ?', [filters.isAvailable]);
        }

        if (filters.minCost !== undefined) {
          qb.andWhere('r.cost >= ?', [filters.minCost]);
        }

        if (filters.maxCost !== undefined) {
          qb.andWhere('r.cost <= ?', [filters.maxCost]);
        }

        if (filters.minCapacity !== undefined) {
          qb.andWhere('r.capacity >= ?', [filters.minCapacity]);
        }

        if (filters.maxCapacity !== undefined) {
          qb.andWhere('r.capacity <= ?', [filters.maxCapacity]);
        }
      }

      const resources = await qb.getResult();
      console.log(`📊 Retrieved ${resources.length} resources from database`);
      return resources;
    } catch (error) {
      console.error('❌ Error fetching resources:', error);
      throw new Error('Failed to fetch resources from database');
    }
  }

  static async getResourceById(id: string): Promise<Resource | null> {
    try {
      const em = getEM();
      const resource = await em.findOne(ResourceEntity, { id });
      
      if (resource) {
        console.log(`📊 Retrieved resource ${id} from database`);
      }
      
      return resource;
    } catch (error) {
      console.error(`❌ Error fetching resource ${id}:`, error);
      throw new Error('Failed to fetch resource from database');
    }
  }

  static async createResource(resourceData: CreateResourceRequest): Promise<Resource> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const now = new Date().toISOString();
        const resourceEntity = new ResourceEntity(
          uuidv4(),
          resourceData.name,
          resourceData.description,
          resourceData.type,
          resourceData.skill,
          resourceData.cost,
          resourceData.capacity,
          resourceData.isAvailable ?? true,
          now,
          now
        );

        em.persist(resourceEntity);
        await em.flush();
        
        console.log(`✅ Created resource ${resourceEntity.id} in database`);
        return resourceEntity;
      } catch (error) {
        console.error('❌ Error creating resource:', error);
        throw new Error('Failed to create resource in database');
      }
    });
  }

  static async updateResource(id: string, updateData: UpdateResourceRequest): Promise<Resource | null> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const resource = await em.findOne(ResourceEntity, { id });
        
        if (!resource) {
          return null;
        }

        // Update fields
        if (updateData.name !== undefined) resource.name = updateData.name;
        if (updateData.description !== undefined) resource.description = updateData.description;
        if (updateData.type !== undefined) resource.type = updateData.type;
        if (updateData.skill !== undefined) resource.skill = updateData.skill;
        if (updateData.cost !== undefined) resource.cost = updateData.cost;
        if (updateData.capacity !== undefined) resource.capacity = updateData.capacity;
        if (updateData.isAvailable !== undefined) resource.isAvailable = updateData.isAvailable;
        
        resource.updatedAt = new Date().toISOString();

        await em.flush();
        
        console.log(`✅ Updated resource ${id} in database`);
        return resource;
      } catch (error) {
        console.error(`❌ Error updating resource ${id}:`, error);
        throw new Error('Failed to update resource in database');
      }
    });
  }

  static async deleteResource(id: string): Promise<boolean> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const resource = await em.findOne(ResourceEntity, { id });
        
        if (!resource) {
          return false;
        }

        em.remove(resource);
        await em.flush();
        
        console.log(`✅ Deleted resource ${id} from database`);
        return true;
      } catch (error) {
        console.error(`❌ Error deleting resource ${id}:`, error);
        throw new Error('Failed to delete resource from database');
      }
    });
  }

  static async getResourceCount(): Promise<number> {
    try {
      const em = getEM();
      const count = await em.count(ResourceEntity);
      console.log(`📊 Total resources in database: ${count}`);
      return count;
    } catch (error) {
      console.error('❌ Error counting resources:', error);
      throw new Error('Failed to count resources in database');
    }
  }

  static async getResourcesByType(type: ResourceType): Promise<Resource[]> {
    try {
      const em = getEM();
      const resources = await em.find(ResourceEntity, { type });
      console.log(`📊 Retrieved ${resources.length} ${type} resources from database`);
      return resources;
    } catch (error) {
      console.error(`❌ Error fetching ${type} resources:`, error);
      throw new Error('Failed to fetch resources by type from database');
    }
  }

  static async getAvailableResources(): Promise<Resource[]> {
    try {
      const em = getEM();
      const resources = await em.find(ResourceEntity, { isAvailable: true });
      console.log(`📊 Retrieved ${resources.length} available resources from database`);
      return resources;
    } catch (error) {
      console.error('❌ Error fetching available resources:', error);
      throw new Error('Failed to fetch available resources from database');
    }
  }
}