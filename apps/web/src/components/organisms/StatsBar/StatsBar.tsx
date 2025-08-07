import React from 'react';
import Text from '../../atoms/Text';
import StatCard from '../../molecules/StatCard';
import Button from '../../atoms/Button';
import { formatNumber } from '@/utils/formatters';

export interface StatsData {
  filtered: number;
  total: number;
  active: number;
  completed: number;
  onHold: number;
}

export interface StatsBarProps {
  stats: StatsData;
  onClearFilters?: () => void;
  showClearButton?: boolean;
  className?: string;
}

const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  onClearFilters,
  showClearButton = false,
  className = '',
}) => {
  return (
    <div className={`bg-dark-800/30 border-b border-dark-600 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="text-gray-400">
              Showing{' '}
              <Text variant="caption" color="primary" weight="medium" as="span">
                {formatNumber(stats.filtered)}
              </Text>{' '}
              of{' '}
              <Text variant="caption" color="white" weight="medium" as="span">
                {formatNumber(stats.total)}
              </Text>{' '}
              projects
            </div>
            {showClearButton && onClearFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <StatCard label="Active:" value={stats.active} status="active" />
            <StatCard
              label="Completed:"
              value={stats.completed}
              status="completed"
            />
            <StatCard label="On Hold:" value={stats.onHold} status="on-hold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
