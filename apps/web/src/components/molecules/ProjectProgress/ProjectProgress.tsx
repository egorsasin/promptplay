import React from 'react';
import ProgressBar from '../../atoms/ProgressBar';
import Text from '../../atoms/Text';
import { formatPercentage } from '@/utils/formatters';
import type { StandardSize, ColorVariant } from '@/types';
import { TEXT_VARIANTS, TEXT_COLORS } from '@/types';

export interface ProjectProgressProps {
  value: number;
  label?: string;
  showLabel?: boolean;
  size?: StandardSize;
  color?: ColorVariant;
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
          <Text variant={TEXT_VARIANTS.BODY} color={TEXT_COLORS.SECONDARY}>
            {label}
          </Text>
          <Text
            variant={TEXT_VARIANTS.BODY}
            color={TEXT_COLORS.PRIMARY}
            weight="medium"
          >
            {formatPercentage(value)}
          </Text>
        </div>
      )}
      <ProgressBar value={value} size={size} color={color} />
    </div>
  );
};

export default ProjectProgress;
