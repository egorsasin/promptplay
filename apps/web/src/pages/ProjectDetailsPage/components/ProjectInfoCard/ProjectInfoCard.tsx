import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import Icon from '@/components/atoms/Icon';
import { formatCurrency } from '@/utils/formatters';
import { formatDateRange, getProjectDuration } from '@/utils/dateUtils';

export interface ProjectInfoCardProps {
  startDate: string;
  endDate: string | null;
  budget: number;
  className?: string;
}

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  startDate,
  endDate,
  budget,
  className = '',
}) => {
  const duration = endDate ? getProjectDuration(startDate, endDate) : 'N/A';

  return (
    <Card className={className}>
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
              {endDate ? formatDateRange(startDate, endDate) : 'N/A'}
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
              {formatCurrency(budget)}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectInfoCard;
