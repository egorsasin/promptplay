import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '@/mocks/mockProjects';
import PageTemplate from '@/components/templates/PageTemplate';
import ProjectHeader from '@/components/organisms/ProjectHeader';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Timeline from '@/components/organisms/Timeline';
import ProjectProgressCard from './components/ProjectProgressCard';
import BudgetOverviewCard from './components/BudgetOverviewCard';
import TechnologiesCard from './components/TechnologiesCard';
import ProjectInfoCard from './components/ProjectInfoCard';
import TeamMembersCard from './components/TeamMembersCard';
import MetadataCard from './components/MetadataCard';

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
            <ProjectProgressCard
              progress={project.progress}
              endDate={project.endDate}
            />
            <BudgetOverviewCard
              budget={project.budget}
              actualCost={project.actualCost}
            />
            {milestones.length > 0 && (
              <Card>
                <Text variant="h2" color="white" className="mb-4">
                  Project Timeline
                </Text>
                <Timeline items={milestones} />
              </Card>
            )}
            <TechnologiesCard tags={project.tags} />
          </div>
          <div className="space-y-8">
            <ProjectInfoCard
              startDate={project.startDate}
              endDate={project.endDate}
              budget={project.budget}
            />
            <TeamMembersCard teamMembers={teamMembers} />
            <MetadataCard
              createdAt={project.createdAt}
              updatedAt={project.updatedAt}
              projectId={project.id}
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProjectDetailsPage;
