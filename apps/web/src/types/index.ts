/**
 * Main types export file
 * Provides centralized access to all type definitions
 * Component prop types are co-located with their respective components
 */

// Common base types
export type {
  Size,
  StandardSize,
  ColorVariant,
  TextAlign,
  FontWeight,
  SortOrder,
  BaseComponentProps,
  ApiResponse,
  BaseFilters,
  DateRange,
  NumericRange,
} from './common/base';

// Domain types
export type {
  ProjectStatus,
  ProjectPriority,
  TeamMember,
  ProjectMilestone,
  Project,
  ProjectSortBy,
} from './domain/project';

export {
  PROJECT_STATUS,
  PROJECT_PRIORITY,
  PROJECT_STATUS_LABELS,
  PROJECT_PRIORITY_LABELS,
  PROJECT_SORT_OPTIONS,
  PROJECT_SORT_LABELS,
} from './domain/project';

// Filter types
export type {
  CostRange,
  ProjectFilters,
  ProjectFilterStats,
} from './domain/filters';

export { DEFAULT_PROJECT_FILTERS } from './domain/filters';

// UI component constants and shared types
export type { SelectOption } from './components/ui';

export {
  BUTTON_VARIANTS,
  TEXT_VARIANTS,
  TEXT_COLORS,
  ICON_NAMES,
} from './components/ui';
