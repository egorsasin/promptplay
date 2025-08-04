import { ProjectStatus, ProjectPriority } from '../types/types';

export const PROJECT_STATUS_LABELS = {
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.COMPLETED]: 'Completed',
  [ProjectStatus.ON_HOLD]: 'On Hold',
} as const;

export const PROJECT_PRIORITY_LABELS = {
  [ProjectPriority.LOW]: 'Low',
  [ProjectPriority.MEDIUM]: 'Medium',
  [ProjectPriority.HIGH]: 'High',
  [ProjectPriority.CRITICAL]: 'Critical',
} as const;

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'startDate', label: 'Start Date' },
  { value: 'budget', label: 'Budget' },
  { value: 'progress', label: 'Progress' },
  { value: 'createdAt', label: 'Created Date' },
] as const;

export const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
] as const;

export const DEFAULT_FILTERS = {
  search: '',
  dateRange: { startDate: null, endDate: null },
  costRange: { min: null, max: null },
  statuses: [],
  priorities: [],
  sortBy: 'createdAt' as const,
  sortOrder: 'desc' as const,
};
