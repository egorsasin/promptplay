import React from 'react';
import Card from '@/components/molecules/Card';
import Text from '@/components/atoms/Text';
import { formatDate } from '@/utils/dateUtils';

export interface MetadataCardProps {
  createdAt: string;
  updatedAt: string;
  projectId: string;
  className?: string;
}

const MetadataCard: React.FC<MetadataCardProps> = ({
  createdAt,
  updatedAt,
  projectId,
  className = '',
}) => {
  return (
    <Card className={className}>
      <Text variant="h2" color="white" className="mb-4">
        Metadata
      </Text>
      <div className="space-y-3">
        <div>
          <Text variant="caption" color="muted">
            Created
          </Text>
          <Text variant="body" color="white">
            {formatDate(createdAt)}
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted">
            Last Updated
          </Text>
          <Text variant="body" color="white">
            {formatDate(updatedAt)}
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted">
            Project ID
          </Text>
          <Text variant="mono" color="white">
            {projectId}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default MetadataCard;
