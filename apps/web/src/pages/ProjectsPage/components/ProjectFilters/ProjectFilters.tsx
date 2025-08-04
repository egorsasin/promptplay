import React from 'react';
import { ProjectStatus, ProjectPriority, type ProjectFilters } from '@/types/types';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_PRIORITY_LABELS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
} from '@/utils/constants';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';

export interface FilterComponentProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: Partial<ProjectFilters>) => void;
}

const ProjectFilters: React.FC<FilterComponentProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ search: e.target.value });
  };

  const handleDateRangeChange = (
    field: 'startDate' | 'endDate',
    value: string
  ) => {
    onFiltersChange({
      dateRange: {
        ...filters.dateRange,
        [field]: value || null,
      },
    });
  };

  const handleCostRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value ? parseFloat(value) : null;
    onFiltersChange({
      costRange: {
        ...filters.costRange,
        [field]: numValue,
      },
    });
  };

  const handleStatusToggle = (status: ProjectStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];

    onFiltersChange({ statuses: newStatuses });
  };

  const handlePriorityToggle = (priority: ProjectPriority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];

    onFiltersChange({ priorities: newPriorities });
  };

  const handleSortChange = (field: string, value: string) => {
    onFiltersChange({ [field]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      dateRange: { startDate: null, endDate: null },
      costRange: { min: null, max: null },
      statuses: [],
      priorities: [],
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.dateRange.startDate ||
    filters.dateRange.endDate ||
    filters.costRange.min !== null ||
    filters.costRange.max !== null ||
    filters.statuses.length > 0 ||
    filters.priorities.length > 0;

  return (
    <div className="bg-gradient-card border border-dark-600 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div>
        <Input
          placeholder="Search projects, clients, or tags..."
          value={filters.search}
          onChange={handleSearchChange}
          leftIcon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={filters.dateRange.startDate || ''}
          onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
        />
        <Input
          label="End Date"
          type="date"
          value={filters.dateRange.endDate || ''}
          onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
        />
      </div>

      {/* Cost Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Min Budget"
          type="number"
          placeholder="0"
          value={filters.costRange.min?.toString() || ''}
          onChange={(e) => handleCostRangeChange('min', e.target.value)}
        />
        <Input
          label="Max Budget"
          type="number"
          placeholder="1000000"
          value={filters.costRange.max?.toString() || ''}
          onChange={(e) => handleCostRangeChange('max', e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PROJECT_STATUS_LABELS).map(([status, label]) => (
            <button
              key={status}
              onClick={() => handleStatusToggle(status as ProjectStatus)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                filters.statuses.includes(status as ProjectStatus)
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-dark-700 text-gray-400 border-dark-600 hover:bg-dark-600 hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Priority
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PROJECT_PRIORITY_LABELS).map(([priority, label]) => (
            <button
              key={priority}
              onClick={() => handlePriorityToggle(priority as ProjectPriority)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                filters.priorities.includes(priority as ProjectPriority)
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-dark-700 text-gray-400 border-dark-600 hover:bg-dark-600 hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(e) => handleSortChange('sortBy', e.target.value)}
          options={SORT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
        <Select
          label="Sort Order"
          value={filters.sortOrder}
          onChange={(e) => handleSortChange('sortOrder', e.target.value)}
          options={SORT_ORDER_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      </div>
    </div>
  );
};

export default ProjectFilters;
