import React from 'react';

export interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  color?: 'emerald' | 'blue' | 'red' | 'yellow';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'md',
  showLabel = false,
  className = '',
  color = 'emerald',
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    emerald: 'bg-gradient-green',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">Progress</span>
          <span className="text-sm font-medium text-emerald-400">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}

      <div className={`progress-bar ${sizeClasses[size]}`}>
        <div
          className={`progress-fill ${colorClasses[color]} transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
