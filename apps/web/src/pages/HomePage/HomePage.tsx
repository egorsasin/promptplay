import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';

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
          <div className="space-y-4">
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

          <div className="bg-gradient-card border border-dark-600 rounded-xl p-8 space-y-6 max-w-3xl mx-auto">
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
                PromptPlay was created as a learning platform for our team to
                practice and master the art of using AI to streamline daily
                development tasks. This project serves as a playground where we
                explore how artificial intelligence can enhance productivity,
                automate repetitive workflows, and accelerate the development
                process.
              </p>
              <p className="text-gray-400 text-sm">
                Through hands-on experimentation with AI-powered tools and
                techniques, we're building expertise that transforms how we
                approach modern software development.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleExploreClick}
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
              onClick={handleDocumentationClick}
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

          <div className="pt-12 border-t border-dark-600">
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
                  Leveraging artificial intelligence to enhance development
                  workflows
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
                <h3 className="text-lg font-medium text-white">
                  Team Practice
                </h3>
                <p className="text-gray-400 text-sm">
                  Collaborative environment for team skill building
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
