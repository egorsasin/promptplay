import { useState, useMemo } from 'react';
import { Project, ProjectFilters } from '../types/types';
import { DEFAULT_FILTERS } from '../utils/constants';
import { isDateInRange } from '../utils/dateUtils';
import { useDebounce } from './useDebounce';

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);
  const debouncedSearch = useDebounce(filters.search, 300);

  const updateFilters = (newFilters: Partial<ProjectFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Search filter
    if (debouncedSearch.trim()) {
      const searchTerm = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.clientName.toLowerCase().includes(searchTerm) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Date range filter
    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      filtered = filtered.filter((project) =>
        isDateInRange(
          project.startDate,
          filters.dateRange.startDate,
          filters.dateRange.endDate
        )
      );
    }

    // Cost range filter
    if (filters.costRange.min !== null || filters.costRange.max !== null) {
      filtered = filtered.filter((project) => {
        const cost = project.budget;
        const minMatch =
          filters.costRange.min === null || cost >= filters.costRange.min;
        const maxMatch =
          filters.costRange.max === null || cost <= filters.costRange.max;
        return minMatch && maxMatch;
      });
    }

    // Status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter((project) =>
        filters.statuses.includes(project.status)
      );
    }

    // Priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter((project) =>
        filters.priorities.includes(project.priority)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'startDate':
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case 'budget':
          aValue = a.budget;
          bValue = b.budget;
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (aValue < bValue) {
        return filters.sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return filters.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [projects, debouncedSearch, filters]);

  const filterStats = useMemo(() => {
    const total = projects.length;
    const filtered = filteredProjects.length;
    const active = filteredProjects.filter((p) => p.status === 'active').length;
    const completed = filteredProjects.filter(
      (p) => p.status === 'completed'
    ).length;
    const onHold = filteredProjects.filter(
      (p) => p.status === 'on-hold'
    ).length;

    return {
      total,
      filtered,
      active,
      completed,
      onHold,
    };
  }, [projects, filteredProjects]);

  return {
    filters,
    filteredProjects,
    filterStats,
    updateFilters,
    resetFilters,
  };
}
