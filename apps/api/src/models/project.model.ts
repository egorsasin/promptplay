import { v4 as uuidv4 } from 'uuid';
import { Project as ProjectEntity } from '../entities/Project';
import { Project, ProjectStatus, ProjectPriority, CreateProjectRequest, UpdateProjectRequest, ProjectFilters } from '../types/project.types';
import { getEM, withTransaction } from '../utils/database.utils';
import { EntityManager } from '@mikro-orm/sqlite';

export class ProjectModel {
  static async getAllProjects(filters?: ProjectFilters): Promise<Project[]> {
    try {
      const em = getEM();
      const qb = em.createQueryBuilder(ProjectEntity, 'p');

      // Apply filters
      if (filters) {
        if (filters.startDate) {
          qb.andWhere('p.startDate >= ?', [filters.startDate]);
        }

        if (filters.endDate) {
          qb.andWhere('p.endDate <= ?', [filters.endDate]);
        }

        if (filters.minCost !== undefined) {
          qb.andWhere('p.cost >= ?', [filters.minCost]);
        }

        if (filters.maxCost !== undefined) {
          qb.andWhere('p.cost <= ?', [filters.maxCost]);
        }

        if (filters.status) {
          qb.andWhere('p.status = ?', [filters.status]);
        }

        if (filters.priority) {
          qb.andWhere('p.priority = ?', [filters.priority]);
        }
      }

      const projects = await qb.getResult();
      console.log(`📊 Retrieved ${projects.length} projects from database`);
      return projects;
    } catch (error) {
      console.error('❌ Error fetching projects:', error);
      throw new Error('Failed to fetch projects from database');
    }
  }

  static async getProjectById(id: string): Promise<Project | null> {
    try {
      const em = getEM();
      const project = await em.findOne(ProjectEntity, { id });
      
      if (project) {
        console.log(`📊 Retrieved project ${id} from database`);
      }
      
      return project;
    } catch (error) {
      console.error(`❌ Error fetching project ${id}:`, error);
      throw new Error('Failed to fetch project from database');
    }
  }

  static async createProject(projectData: CreateProjectRequest): Promise<Project> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const now = new Date().toISOString();
        const projectEntity = new ProjectEntity(
          uuidv4(),
          projectData.name,
          projectData.description,
          projectData.startDate,
          projectData.endDate,
          projectData.cost,
          projectData.status,
          projectData.priority,
          now,
          now
        );

        em.persist(projectEntity);
        await em.flush();
        
        console.log(`✅ Created project ${projectEntity.id} in database`);
        return projectEntity;
      } catch (error) {
        console.error('❌ Error creating project:', error);
        throw new Error('Failed to create project in database');
      }
    });
  }

  static async updateProject(id: string, updateData: UpdateProjectRequest): Promise<Project | null> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const project = await em.findOne(ProjectEntity, { id });
        
        if (!project) {
          return null;
        }

        // Update fields
        if (updateData.name !== undefined) project.name = updateData.name;
        if (updateData.description !== undefined) project.description = updateData.description;
        if (updateData.startDate !== undefined) project.startDate = updateData.startDate;
        if (updateData.endDate !== undefined) project.endDate = updateData.endDate;
        if (updateData.cost !== undefined) project.cost = updateData.cost;
        if (updateData.status !== undefined) project.status = updateData.status;
        if (updateData.priority !== undefined) project.priority = updateData.priority;
        
        project.updatedAt = new Date().toISOString();

        await em.flush();
        
        console.log(`✅ Updated project ${id} in database`);
        return project;
      } catch (error) {
        console.error(`❌ Error updating project ${id}:`, error);
        throw new Error('Failed to update project in database');
      }
    });
  }

  static async deleteProject(id: string): Promise<boolean> {
    return await withTransaction(async (em: EntityManager) => {
      try {
        const project = await em.findOne(ProjectEntity, { id });
        
        if (!project) {
          return false;
        }

        em.remove(project);
        await em.flush();
        
        console.log(`✅ Deleted project ${id} from database`);
        return true;
      } catch (error) {
        console.error(`❌ Error deleting project ${id}:`, error);
        throw new Error('Failed to delete project from database');
      }
    });
  }

  static async getProjectCount(): Promise<number> {
    try {
      const em = getEM();
      const count = await em.count(ProjectEntity);
      console.log(`📊 Total projects in database: ${count}`);
      return count;
    } catch (error) {
      console.error('❌ Error counting projects:', error);
      throw new Error('Failed to count projects in database');
    }
  }
}