export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ON_HOLD = 'on-hold',
}

export enum ProjectPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  budget: number;
  actualCost: number;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  clientName: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface CostRange {
  min: number | null;
  max: number | null;
}

export interface ProjectFilters {
  search: string;
  dateRange: DateRange;
  costRange: CostRange;
  statuses: ProjectStatus[];
  priorities: ProjectPriority[];
  sortBy: 'name' | 'startDate' | 'budget' | 'progress' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}
