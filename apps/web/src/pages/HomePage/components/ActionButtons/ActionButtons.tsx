import React from 'react';
import Button from '@/components/atoms/Button';

export interface ActionButtonsProps {
  onExploreClick: () => void;
  onDocumentationClick: () => void;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onExploreClick,
  onDocumentationClick,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 ${className}`}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={onExploreClick}
        className="w-full sm:w-auto min-w-[160px]"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        Explore Projects
      </Button>

      <Button
        variant="danger"
        size="lg"
        onClick={onDocumentationClick}
        className="w-full sm:w-auto min-w-[160px]"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        What?!
      </Button>
    </div>
  );
};

export default ActionButtons;
