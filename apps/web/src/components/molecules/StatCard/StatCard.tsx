import React from 'react';
import Text from '../../atoms/Text';
import StatusIndicator from '../../atoms/StatusIndicator';
import type { StatusType } from '../../atoms/StatusIndicator';

export interface StatCardProps {
  label: string;
  value: string | number;
  status?: StatusType;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  status,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {status && <StatusIndicator status={status} size="sm" />}
      <div>
        <Text variant="caption" color="muted">
          {label}
        </Text>
        <Text variant="body" color="white" weight="medium">
          {value}
        </Text>
      </div>
    </div>
  );
};

export default StatCard;
