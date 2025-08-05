import React from 'react';
import ProgressBar from '../../atoms/ProgressBar';
import Text from '../../atoms/Text';
import { formatPercentage } from '@/utils/formatters';

export interface ProjectProgressProps {
  value: number;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'blue' | 'red' | 'yellow';
  className?: string;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  value,
  label = 'Progress',
  showLabel = true,
  size = 'md',
  color = 'emerald',
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <Text variant="body" color="secondary">
            {label}
          </Text>
          <Text variant="body" color="primary" weight="medium">
            {formatPercentage(value)}
          </Text>
        </div>
      )}
      <ProgressBar value={value} size={size} color={color} />
    </div>
  );
};

export default ProjectProgress;
