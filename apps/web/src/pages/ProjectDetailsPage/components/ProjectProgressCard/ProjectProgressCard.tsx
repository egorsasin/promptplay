import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import ProjectProgress from '@/components/molecules/ProjectProgress';
import { getDaysRemaining } from '@/utils/dateUtils';

export interface ProjectProgressCardProps {
  progress: number;
  endDate: string | null;
  className?: string;
}

const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({
  progress,
  endDate,
  className = '',
}) => {
  const daysRemaining = endDate ? getDaysRemaining(endDate) : null;

  return (
    <Card className={className}>
      <Text variant="h2" color="white" className="mb-4">
        Project Progress
      </Text>
      <div className="space-y-4">
        <ProjectProgress value={progress} label="Overall Progress" size="lg" />
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
  );
};

export default ProjectProgressCard;
