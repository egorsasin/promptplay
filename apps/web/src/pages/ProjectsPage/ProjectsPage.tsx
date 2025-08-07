import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import PageTemplate from '@/components/templates/PageTemplate';
import StatsBar from '@/components/organisms/StatsBar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import ProjectFilters from './components/ProjectFilters';
import ProjectList from './components/ProjectList';

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
      <PageTemplate>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
              <Icon name="alert-circle" size="lg" className="text-red-400" />
            </div>
            <div>
              <Text variant="h2" color="white" className="mb-2">
                Error Loading Projects
              </Text>
              <Text variant="body" color="muted" className="mb-4">
                {error}
              </Text>
              <Button onClick={refreshProjects}>Try Again</Button>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const pageHeader = (
    <>
      <div className="bg-dark-800/50 border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="h1" color="white">
                Projects
              </Text>
              <Text variant="body" color="muted" className="mt-1">
                Manage and track your project portfolio
              </Text>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Icon name="filter" size="sm" className="mr-2" />
                Filters
              </Button>
              <Button onClick={refreshProjects} loading={loading}>
                <Icon name="refresh" size="sm" className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <StatsBar
        stats={filterStats}
        onClearFilters={resetFilters}
        showClearButton={filterStats.filtered !== filterStats.total}
      />
    </>
  );

  const sidebar = showFilters ? (
    <ProjectFilters
      filters={filters}
      onFiltersChange={updateFilters}
    />
  ) : null;

  return (
    <PageTemplate
      header={pageHeader}
      sidebar={sidebar}
      showSidebar={showFilters}
    >
      <ProjectList projects={filteredProjects} loading={loading} />
    </PageTemplate>
  );
};

export default ProjectsPage;
