/**
 * Base types and utilities used throughout the application
 */

// Common size variants used across components
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Standard size variants (most common)
export type StandardSize = 'sm' | 'md' | 'lg';

// Color variants for UI components
export type ColorVariant = 'emerald' | 'blue' | 'red' | 'yellow';

// Text alignment options
export type TextAlign = 'left' | 'center' | 'right';

// Font weight options
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

// Sort order options
export type SortOrder = 'asc' | 'desc';

// Common HTML element props
export type BaseComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

// Generic filter interface
export interface BaseFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// Date range interface
export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

// Numeric range interface
export interface NumericRange {
  min: number | null;
  max: number | null;
}
