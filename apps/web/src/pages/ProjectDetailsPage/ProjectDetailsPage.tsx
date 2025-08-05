import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '@/mocks/mockProjects';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_PRIORITY_LABELS,
} from '@/utils/constants';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import {
  formatDate,
  formatDateRange,
  getDaysRemaining,
  getProjectDuration,
} from '@/utils/dateUtils';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import TeamMember from '@/components/TeamMember';
import Timeline from '@/components/Timeline';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The project you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(project.endDate);
  const isOverBudget = project.actualCost > project.budget;
  const budgetPercentage = (project.actualCost / project.budget) * 100;
  const duration = getProjectDuration(project.startDate, project.endDate);

  const teamMembers = project.teamMembers || [];
  const milestones = project.milestones || [];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/projects')}
            className="mb-4"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {project.name}
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant={project.status} size="md">
                  {PROJECT_STATUS_LABELS[project.status]}
                </Badge>
                <Badge variant={project.priority} size="md">
                  {PROJECT_PRIORITY_LABELS[project.priority]}
                </Badge>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Client</p>
              <p className="text-lg font-semibold text-emerald-400">
                {project.clientName}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Project Progress
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Overall Progress</span>
                  <span className="text-lg font-semibold text-emerald-400">
                    {formatPercentage(project.progress)}
                  </span>
                </div>
                <ProgressBar
                  value={project.progress}
                  size="lg"
                  showLabel={false}
                />

                {daysRemaining !== null && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-300">Timeline Status</span>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        daysRemaining < 0
                          ? 'bg-red-500/20 text-red-400'
                          : daysRemaining < 30
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {daysRemaining < 0
                        ? `${Math.abs(daysRemaining)} days overdue`
                        : `${daysRemaining} days remaining`}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Budget Overview */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Budget Overview
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Budget</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Actual Cost</p>
                    <p
                      className={`text-2xl font-bold ${
                        isOverBudget ? 'text-red-400' : 'text-emerald-400'
                      }`}
                    >
                      {formatCurrency(project.actualCost)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Budget Utilization</span>
                    <span
                      className={`font-semibold ${
                        isOverBudget ? 'text-red-400' : 'text-emerald-400'
                      }`}
                    >
                      {formatPercentage(budgetPercentage)}
                    </span>
                  </div>
                  <ProgressBar
                    value={Math.min(budgetPercentage, 100)}
                    size="md"
                    color={
                      isOverBudget
                        ? 'red'
                        : budgetPercentage > 80
                        ? 'yellow'
                        : 'emerald'
                    }
                  />
                </div>

                {isOverBudget && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm font-medium">
                      ⚠️ Project is over budget by{' '}
                      {formatCurrency(project.actualCost - project.budget)}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Project Timeline */}
            {milestones.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Project Timeline
                </h2>
                <Timeline items={milestones} />
              </Card>
            )}

            {/* Technologies & Tags */}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Technologies & Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-dark-600 text-gray-300 rounded-lg border border-dark-500 hover:bg-dark-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Project Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white font-medium">{duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="text-white font-medium">
                      {formatDateRange(project.startDate, project.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400">Budget Range</p>
                    <p className="text-white font-medium">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            {teamMembers.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Team Members
                </h2>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <TeamMember
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      role={member.role}
                      avatar={member.avatar}
                    />
                  ))}
                </div>
              </Card>
            )}
            <Card>
              <h2 className="text-xl font-semibold text-white mb-4">
                Metadata
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Created</p>
                  <p className="text-white">{formatDate(project.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="text-white">{formatDate(project.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Project ID</p>
                  <p className="text-white font-mono text-sm">{project.id}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
