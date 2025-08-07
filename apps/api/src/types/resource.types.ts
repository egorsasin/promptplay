export enum ResourceType {
  PERSON = 'person',
  HARDWARE = 'hardware',
  SOFTWARE = 'software'
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: ResourceType;
  skill: string[];
  cost: number;
  capacity: number;
  isAvailable: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface CreateResourceRequest {
  name: string;
  description: string;
  type: ResourceType;
  skill: string[];
  cost: number;
  capacity: number;
  isAvailable: boolean;
}

export interface UpdateResourceRequest {
  name?: string;
  description?: string;
  type?: ResourceType;
  skill?: string[];
  cost?: number;
  capacity?: number;
  isAvailable?: boolean;
}

export interface ResourceFilters {
  type?: ResourceType;
  skill?: string; // Filter by resources that have this skill
  isAvailable?: boolean;
  minCost?: number;
  maxCost?: number;
  minCapacity?: number;
  maxCapacity?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}