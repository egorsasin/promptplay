import { v4 as uuidv4 } from 'uuid';
import { Project, ProjectStatus, ProjectPriority, CreateProjectRequest, UpdateProjectRequest, ProjectFilters } from '../types/project.types';

// In-memory storage for projects
const projects: Project[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    cost: 15000,
    status: ProjectStatus.ACTIVE,
    priority: ProjectPriority.HIGH,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    startDate: '2024-03-15',
    endDate: '2024-08-15',
    cost: 45000,
    status: ProjectStatus.ACTIVE,
    priority: ProjectPriority.CRITICAL,
    createdAt: '2024-01-20T14:30:00.000Z',
    updatedAt: '2024-01-25T09:15:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Database Migration',
    description: 'Migrate legacy database to modern cloud infrastructure',
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    cost: 8500,
    status: ProjectStatus.COMPLETED,
    priority: ProjectPriority.MEDIUM,
    createdAt: '2024-01-05T08:00:00.000Z',
    updatedAt: '2024-02-28T16:45:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Marketing Campaign',
    description: 'Q2 digital marketing campaign across multiple channels',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    cost: 12000,
    status: ProjectStatus.ON_HOLD,
    priority: ProjectPriority.LOW,
    createdAt: '2024-01-30T11:20:00.000Z',
    updatedAt: '2024-01-30T11:20:00.000Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Security Audit',
    description: 'Comprehensive security assessment and vulnerability testing',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    cost: 7500,
    status: ProjectStatus.INACTIVE,
    priority: ProjectPriority.HIGH,
    createdAt: '2024-02-01T13:10:00.000Z',
    updatedAt: '2024-02-01T13:10:00.000Z',
  },
];

export class ProjectModel {
  static getAllProjects(filters?: ProjectFilters): Project[] {
    let filteredProjects = [...projects];

    if (filters) {
      if (filters.startDate) {
        filteredProjects = filteredProjects.filter(
          project => project.startDate >= filters.startDate!
        );
      }

      if (filters.endDate) {
        filteredProjects = filteredProjects.filter(
          project => project.endDate <= filters.endDate!
        );
      }

      if (filters.minCost !== undefined) {
        filteredProjects = filteredProjects.filter(
          project => project.cost >= filters.minCost!
        );
      }

      if (filters.maxCost !== undefined) {
        filteredProjects = filteredProjects.filter(
          project => project.cost <= filters.maxCost!
        );
      }

      if (filters.status) {
        filteredProjects = filteredProjects.filter(
          project => project.status === filters.status
        );
      }

      if (filters.priority) {
        filteredProjects = filteredProjects.filter(
          project => project.priority === filters.priority
        );
      }
    }

    return filteredProjects;
  }

  static getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
  }

  static createProject(projectData: CreateProjectRequest): Project {
    const now = new Date().toISOString();
    const newProject: Project = {
      id: uuidv4(),
      ...projectData,
      createdAt: now,
      updatedAt: now,
    };

    projects.push(newProject);
    return newProject;
  }

  static updateProject(id: string, updateData: UpdateProjectRequest): Project | null {
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex === -1) {
      return null;
    }

    const updatedProject: Project = {
      ...projects[projectIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    projects[projectIndex] = updatedProject;
    return updatedProject;
  }

  static deleteProject(id: string): boolean {
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex === -1) {
      return false;
    }

    projects.splice(projectIndex, 1);
    return true;
  }

  static getProjectCount(): number {
    return projects.length;
  }
}