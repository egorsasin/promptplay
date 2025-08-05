import React from 'react';
import type { Project } from '@/types';
import ProjectCard from '../ProjectCard';

interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  className?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-dark-600 rounded w-3/4"></div>
                  <div className="h-4 bg-dark-600 rounded w-full"></div>
                  <div className="h-4 bg-dark-600 rounded w-2/3"></div>
                  <div className="h-3 bg-emerald-600/30 rounded w-1/3"></div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <div className="h-6 bg-dark-600 rounded w-16"></div>
                  <div className="h-6 bg-dark-600 rounded w-16"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-dark-600 rounded w-16"></div>
                  <div className="h-4 bg-dark-600 rounded w-12"></div>
                </div>
                <div className="h-2 bg-dark-600 rounded w-full"></div>
              </div>

              <div className="space-y-3">
                <div className="h-4 bg-dark-600 rounded w-full"></div>
                <div className="h-4 bg-dark-600 rounded w-5/6"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-dark-600 rounded w-16"></div>
                  <div className="h-6 bg-dark-600 rounded w-20"></div>
                  <div className="h-6 bg-dark-600 rounded w-14"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-16 ${className}`}
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-dark-700 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 max-w-md">
              No projects match your current filters. Try adjusting your search
              criteria or clearing the filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
