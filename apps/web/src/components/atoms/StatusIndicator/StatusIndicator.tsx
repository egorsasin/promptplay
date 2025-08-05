import React from 'react';

export type StatusType =
  | 'active'
  | 'completed'
  | 'on-hold'
  | 'warning'
  | 'error';

export interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusColors = {
  active: 'bg-emerald-500',
  completed: 'bg-blue-500',
  'on-hold': 'bg-yellow-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const colorClass = statusColors[status];
  const sizeClass = sizeClasses[size];

  return (
    <div className={`${sizeClass} ${colorClass} rounded-full ${className}`} />
  );
};

export default StatusIndicator;
