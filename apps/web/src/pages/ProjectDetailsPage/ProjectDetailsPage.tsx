import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '@/mocks/mockProjects';
import { formatCurrency } from '@/utils/formatters';
import {
  formatDate,
  formatDateRange,
  getDaysRemaining,
  getProjectDuration,
} from '@/utils/dateUtils';
import PageTemplate from '@/components/templates/PageTemplate';
import ProjectHeader from '@/components/organisms/ProjectHeader';
import ProjectProgress from '@/components/molecules/ProjectProgress';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import Icon from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import TeamMember from '@/components/molecules/TeamMember';
import Timeline from '@/components/organisms/Timeline';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageTemplate>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Text variant="h2" color="white" className="mb-4">
              Project Not Found
            </Text>
            <Text variant="body" color="muted" className="mb-6">
              The project you're looking for doesn't exist.
            </Text>
            <Button onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const daysRemaining = getDaysRemaining(project.endDate);
  const isOverBudget = project.actualCost > project.budget;
  const budgetPercentage = (project.actualCost / project.budget) * 100;
  const duration = getProjectDuration(project.startDate, project.endDate);

  const teamMembers = project.teamMembers || [];
  const milestones = project.milestones || [];

  return (
    <PageTemplate>
      <div className="container mx-auto px-4 py-8">
        <ProjectHeader
          project={project}
          onBackClick={() => navigate('/projects')}
          showBackButton={true}
          className="mb-8"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <Text variant="h2" color="white" className="mb-4">
                Project Progress
              </Text>
              <div className="space-y-4">
                <ProjectProgress
                  value={project.progress}
                  label="Overall Progress"
                  size="lg"
                />
                {daysRemaining !== null && (
                  <div className="flex items-center justify-between pt-2">
                    <Text variant="body" color="secondary">
                      Timeline Status
                    </Text>
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
            <Card>
              <Text variant="h2" color="white" className="mb-4">
                Budget Overview
              </Text>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text variant="caption" color="muted">
                      Total Budget
                    </Text>
                    <Text variant="h2" color="white">
                      {formatCurrency(project.budget)}
                    </Text>
                  </div>
                  <div>
                    <Text variant="caption" color="muted">
                      Actual Cost
                    </Text>
                    <Text
                      variant="h2"
                      color={isOverBudget ? 'error' : 'success'}
                    >
                      {formatCurrency(project.actualCost)}
                    </Text>
                  </div>
                </div>
                <ProjectProgress
                  value={Math.min(budgetPercentage, 100)}
                  label="Budget Utilization"
                  size="md"
                  color={
                    isOverBudget
                      ? 'red'
                      : budgetPercentage > 80
                      ? 'yellow'
                      : 'emerald'
                  }
                />
                {isOverBudget && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <Text variant="body" color="error" weight="medium">
                      ⚠️ Project is over budget by{' '}
                      {formatCurrency(project.actualCost - project.budget)}
                    </Text>
                  </div>
                )}
              </div>
            </Card>
            {milestones.length > 0 && (
              <Card>
                <Text variant="h2" color="white" className="mb-4">
                  Project Timeline
                </Text>
                <Timeline items={milestones} />
              </Card>
            )}
            <Card>
              <Text variant="h2" color="white" className="mb-4">
                Technologies & Tags
              </Text>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-dark-600 text-gray-300 rounded-lg border border-dark-500 hover:bg-dark-500 transition-colors"
                  >
                    <Icon name="tag" size="sm" className="mr-1.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <Text variant="h2" color="white" className="mb-4">
                Project Information
              </Text>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="calendar" size="md" className="text-gray-400" />
                  <div>
                    <Text variant="caption" color="muted">
                      Duration
                    </Text>
                    <Text variant="body" color="white" weight="medium">
                      {duration}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="clock" size="md" className="text-gray-400" />
                  <div>
                    <Text variant="caption" color="muted">
                      Timeline
                    </Text>
                    <Text variant="body" color="white" weight="medium">
                      {formatDateRange(project.startDate, project.endDate)}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="dollar" size="md" className="text-gray-400" />
                  <div>
                    <Text variant="caption" color="muted">
                      Budget Range
                    </Text>
                    <Text variant="body" color="white" weight="medium">
                      {formatCurrency(project.budget)}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
            {teamMembers.length > 0 && (
              <Card>
                <Text variant="h2" color="white" className="mb-4">
                  Team Members
                </Text>
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
              <Text variant="h2" color="white" className="mb-4">
                Metadata
              </Text>
              <div className="space-y-3">
                <div>
                  <Text variant="caption" color="muted">
                    Created
                  </Text>
                  <Text variant="body" color="white">
                    {formatDate(project.createdAt)}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" color="muted">
                    Last Updated
                  </Text>
                  <Text variant="body" color="white">
                    {formatDate(project.updatedAt)}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" color="muted">
                    Project ID
                  </Text>
                  <Text variant="mono" color="white">
                    {project.id}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProjectDetailsPage;
