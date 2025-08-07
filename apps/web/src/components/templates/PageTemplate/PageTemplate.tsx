import React from 'react';

export interface PageTemplateProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  header,
  sidebar,
  children,
  showSidebar = false,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gradient-dark ${className}`}>
      {header}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {showSidebar && sidebar && (
            <div className="lg:col-span-3">
              <div className="sticky top-8">{sidebar}</div>
            </div>
          )}

          <div className={showSidebar ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
