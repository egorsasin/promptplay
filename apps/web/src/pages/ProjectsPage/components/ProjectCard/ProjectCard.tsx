import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_PRIORITY_LABELS,
} from '@/types';
import {
  formatCurrency,
  formatPercentage,
  truncateText,
} from '@/utils/formatters';
import { formatDateRange, getDaysRemaining } from '@/utils/dateUtils';
import Card from '@/components/molecules/Card';
import Badge from '@/components/atoms/Badge';
import ProgressBar from '@/components/atoms/ProgressBar';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
}) => {
  const navigate = useNavigate();
  const daysRemaining = getDaysRemaining(project.endDate);
  const isOverBudget = project.actualCost > project.budget;
  const budgetPercentage = (project.actualCost / project.budget) * 100;

  const handleCardClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      className={`cursor-pointer transition-transform hover:scale-[1.02] ${className}`}
      onClick={handleCardClick}
    >
      <Card className="animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1 truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {truncateText(project.description, 120)}
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                {project.clientName}
              </p>
            </div>

            <div className="flex flex-col items-end space-y-2 ml-4">
              <Badge variant={project.status} size="sm">
                {PROJECT_STATUS_LABELS[project.status]}
              </Badge>
              <Badge variant={project.priority} size="sm">
                {PROJECT_PRIORITY_LABELS[project.priority]}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Progress</span>
              <span className="text-sm font-medium text-emerald-400">
                {formatPercentage(project.progress)}
              </span>
            </div>
            <ProgressBar value={project.progress} size="md" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-400">Duration: </span>
              <span className="text-gray-300">
                {formatDateRange(project.startDate, project.endDate)}
              </span>
            </div>
          </div>

          {daysRemaining !== null && (
            <div
              className={`text-xs px-2 py-1 rounded ${
                daysRemaining < 0
                  ? 'bg-red-500/20 text-red-400'
                  : daysRemaining < 30
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {daysRemaining < 0
                ? `${Math.abs(daysRemaining)} days overdue`
                : `${daysRemaining} days left`}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Budget</span>
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {formatCurrency(project.actualCost)} /{' '}
                  {formatCurrency(project.budget)}
                </div>
                <div
                  className={`text-xs ${
                    isOverBudget ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {formatPercentage(budgetPercentage)} used
                </div>
              </div>
            </div>
            <ProgressBar
              value={Math.min(budgetPercentage, 100)}
              size="sm"
              color={
                isOverBudget
                  ? 'red'
                  : budgetPercentage > 80
                  ? 'yellow'
                  : 'emerald'
              }
            />
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-dark-600 text-gray-300 rounded border border-dark-500"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-dark-600 text-gray-400 rounded border border-dark-500">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-dark-600">
            <div className="text-xs text-gray-500">
              Created {new Date(project.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
