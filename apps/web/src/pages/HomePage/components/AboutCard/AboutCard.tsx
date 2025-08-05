import React from 'react';

export interface AboutCardProps {
  className?: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-gradient-card border border-dark-600 rounded-xl p-8 space-y-6 max-w-3xl mx-auto ${className}`}
    >
      <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          About This Project
        </h2>
        <p className="text-gray-300 leading-relaxed">
          PromptPlay was created as a learning platform for our team to practice
          and master the art of using AI to streamline daily development tasks.
          This project serves as a playground where we explore how artificial
          intelligence can enhance productivity, automate repetitive workflows,
          and accelerate the development process.
        </p>
        <p className="text-gray-400 text-sm">
          Through hands-on experimentation with AI-powered tools and techniques,
          we're building expertise that transforms how we approach modern
          software development.
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
