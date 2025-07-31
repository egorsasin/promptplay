import { ApiResponse } from '../types/project.types';

export const createSuccessResponse = <T>(
  data: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  error: string,
  message?: string
): ApiResponse<null> => ({
  success: false,
  error,
  message,
  timestamp: new Date().toISOString(),
});

export const createNotFoundResponse = (
  resource: string = 'Resource'
): ApiResponse<null> => ({
  success: false,
  error: `${resource} not found`,
  timestamp: new Date().toISOString(),
});

export const createValidationErrorResponse = (
  errors: string[]
): ApiResponse<null> => ({
  success: false,
  error: 'Validation failed',
  message: errors.join(', '),
  timestamp: new Date().toISOString(),
});