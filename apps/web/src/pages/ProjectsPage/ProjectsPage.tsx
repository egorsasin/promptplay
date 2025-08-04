import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import ProjectFilters from './components/ProjectFilters';
import ProjectList from './components/ProjectList';
import Button from '@/components/Button';
import { formatNumber } from '@/utils/formatters';

const ProjectsPage: React.FC = () => {
  const { projects, loading, error, refreshProjects } = useProjects();
  const {
    filters,
    filteredProjects,
    filterStats,
    updateFilters,
    resetFilters,
  } = useProjectFilters(projects);
  const [showFilters, setShowFilters] = useState(true);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Error Loading Projects
            </h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={refreshProjects}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="bg-dark-800/50 border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Projects</h1>
              <p className="text-gray-400 mt-1">
                Manage and track your project portfolio
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </Button>
              <Button onClick={refreshProjects} loading={loading}>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-dark-800/30 border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="text-gray-400">
                Showing{' '}
                <span className="text-emerald-400 font-medium">
                  {formatNumber(filterStats.filtered)}
                </span>{' '}
                of{' '}
                <span className="text-white font-medium">
                  {formatNumber(filterStats.total)}
                </span>{' '}
                projects
              </div>
              {filterStats.filtered !== filterStats.total && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-gray-400">Active: </span>
                <span className="text-emerald-400 font-medium ml-1">
                  {filterStats.active}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-400">Completed: </span>
                <span className="text-blue-400 font-medium ml-1">
                  {filterStats.completed}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-gray-400">On Hold: </span>
                <span className="text-yellow-400 font-medium ml-1">
                  {filterStats.onHold}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-3 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-8">
              <ProjectFilters
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div
            className={`${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'} ${
              showFilters ? 'mt-8 lg:mt-0' : ''
            }`}
          >
            <ProjectList projects={filteredProjects} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
