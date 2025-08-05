import { Routes, Route } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';

export function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-400">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default AppRouter;
