/**
 * Project domain types and enums
 */

// Project status enum with const assertion for type safety
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ON_HOLD: 'on-hold',
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

// Project priority enum with const assertion
export const PROJECT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type ProjectPriority =
  (typeof PROJECT_PRIORITY)[keyof typeof PROJECT_PRIORITY];

// Project status labels for display
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [PROJECT_STATUS.ACTIVE]: 'Active',
  [PROJECT_STATUS.COMPLETED]: 'Completed',
  [PROJECT_STATUS.ON_HOLD]: 'On Hold',
} as const;

// Project priority labels for display
export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  [PROJECT_PRIORITY.LOW]: 'Low',
  [PROJECT_PRIORITY.MEDIUM]: 'Medium',
  [PROJECT_PRIORITY.HIGH]: 'High',
  [PROJECT_PRIORITY.CRITICAL]: 'Critical',
} as const;

// Team member interface
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string | null;
}

// Project milestone interface
export interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

// Main project interface
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
  teamMembers?: TeamMember[];
  milestones?: ProjectMilestone[];
}

// Project sort options
export const PROJECT_SORT_OPTIONS = {
  NAME: 'name',
  START_DATE: 'startDate',
  BUDGET: 'budget',
  PROGRESS: 'progress',
  CREATED_AT: 'createdAt',
} as const;

export type ProjectSortBy =
  (typeof PROJECT_SORT_OPTIONS)[keyof typeof PROJECT_SORT_OPTIONS];

// Project sort option labels
export const PROJECT_SORT_LABELS: Record<ProjectSortBy, string> = {
  [PROJECT_SORT_OPTIONS.NAME]: 'Name',
  [PROJECT_SORT_OPTIONS.START_DATE]: 'Start Date',
  [PROJECT_SORT_OPTIONS.BUDGET]: 'Budget',
  [PROJECT_SORT_OPTIONS.PROGRESS]: 'Progress',
  [PROJECT_SORT_OPTIONS.CREATED_AT]: 'Created Date',
} as const;
