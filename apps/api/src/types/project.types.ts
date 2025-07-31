export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold'
}

export enum ProjectPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string;   // YYYY-MM-DD format
  cost: number;
  status: ProjectStatus;
  priority: ProjectPriority;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  cost: number;
  status: ProjectStatus;
  priority: ProjectPriority;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  cost?: number;
  status?: ProjectStatus;
  priority?: ProjectPriority;
}

export interface ProjectFilters {
  startDate?: string;
  endDate?: string;
  minCost?: number;
  maxCost?: number;
  status?: ProjectStatus;
  priority?: ProjectPriority;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}