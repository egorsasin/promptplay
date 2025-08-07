/**
 * Filter-related types for project management
 */

import type {
  DateRange,
  NumericRange,
  BaseFilters,
  SortOrder,
} from '../common/base';
import type { ProjectStatus, ProjectPriority, ProjectSortBy } from './project';

// Cost range type (alias for NumericRange with semantic meaning)
export type CostRange = NumericRange;

// Project-specific filters interface
export interface ProjectFilters extends BaseFilters {
  search: string;
  dateRange: DateRange;
  costRange: CostRange;
  statuses: ProjectStatus[];
  priorities: ProjectPriority[];
  sortBy: ProjectSortBy;
  sortOrder: SortOrder;
}

// Default filter values
export const DEFAULT_PROJECT_FILTERS: ProjectFilters = {
  search: '',
  dateRange: { startDate: null, endDate: null },
  costRange: { min: null, max: null },
  statuses: [],
  priorities: [],
  sortBy: 'createdAt',
  sortOrder: 'desc',
} as const;

// Filter statistics interface
export interface ProjectFilterStats {
  total: number;
  filtered: number;
  active: number;
  completed: number;
  onHold: number;
}
