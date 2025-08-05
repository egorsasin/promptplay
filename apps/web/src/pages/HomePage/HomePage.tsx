import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutCard from './components/AboutCard';
import ActionButtons from './components/ActionButtons';
import FeatureGrid from './components/FeatureGrid';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/projects');
  };

  const handleDocumentationClick = () => {
    window.open(
      'https://github.com/RooCodeInc/Roo-Code?utm_source=aiagentstore.ai',
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <HeroSection />
          <AboutCard />
          <ActionButtons
            onExploreClick={handleExploreClick}
            onDocumentationClick={handleDocumentationClick}
          />
          <FeatureGrid />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
