/**
 * UI component constants and shared types
 * Component-specific prop interfaces are co-located with their components
 */

// Button component constants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  DANGER: 'danger',
} as const;

// Text component constants
export const TEXT_VARIANTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  BODY: 'body',
  CAPTION: 'caption',
  LABEL: 'label',
  MONO: 'mono',
} as const;

export const TEXT_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  MUTED: 'muted',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  WHITE: 'white',
} as const;

// Icon component constants
export const ICON_NAMES = {
  SEARCH: 'search',
  FILTER: 'filter',
  REFRESH: 'refresh',
  ARROW_LEFT: 'arrow-left',
  CALENDAR: 'calendar',
  CLOCK: 'clock',
  DOLLAR: 'dollar',
  TAG: 'tag',
  BRIEFCASE: 'briefcase',
  ALERT_CIRCLE: 'alert-circle',
  CHECK_CIRCLE: 'check-circle',
  X_CIRCLE: 'x-circle',
  USERS: 'users',
  CHART_BAR: 'chart-bar',
  EXTERNAL_LINK: 'external-link',
} as const;

// Shared utility types for components
export interface SelectOption {
  value: string;
  label: string;
}
