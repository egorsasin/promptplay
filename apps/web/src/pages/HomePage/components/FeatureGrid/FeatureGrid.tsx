import React from 'react';

export interface FeatureGridProps {
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ className = '' }) => {
  return (
    <div className={`pt-12 border-t border-dark-600 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">AI-Powered</h3>
          <p className="text-gray-400 text-sm">
            Leveraging artificial intelligence to enhance development workflows
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">Learning</h3>
          <p className="text-gray-400 text-sm">
            A platform for continuous learning and skill development
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white">Team Practice</h3>
          <p className="text-gray-400 text-sm">
            Collaborative environment for team skill building
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
