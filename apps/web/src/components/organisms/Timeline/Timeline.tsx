import React from 'react';
import { formatDate } from '@/utils/dateUtils';

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                item.completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-500 bg-transparent'
              }`}
            >
              {item.completed && (
                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
              )}
            </div>
            {index < items.length - 1 && (
              <div className="w-0.5 h-8 bg-gray-600 mt-2"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                className={`font-medium ${
                  item.completed ? 'text-white' : 'text-gray-400'
                }`}
              >
                {item.title}
              </h3>
              <span className="text-sm text-gray-500">
                {formatDate(item.date)}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
