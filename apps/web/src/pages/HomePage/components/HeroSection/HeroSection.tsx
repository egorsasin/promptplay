import React from 'react';

export interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-5xl md:text-6xl font-bold text-white">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          PromptPlay
        </span>
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Your AI-powered project management companion
      </p>
    </div>
  );
};

export default HeroSection;
