import { useState, useEffect } from 'react';
import type { Project } from '@/types';
import { mockProjects } from '@/mocks/mockProjects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 800));

        setProjects(mockProjects);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const refreshProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to refresh projects');
      console.error('Error refreshing projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refreshProjects,
  };
}
