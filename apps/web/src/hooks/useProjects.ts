import { useState, useEffect } from 'react';
import { Project } from '../types/types';
import { mockProjects } from '@/mocks/mockProjects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with loading delay
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to refresh projects');
      console.error('Error refreshing projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
  };

  const getProjectsByStatus = (status: string): Project[] => {
    return projects.filter((project) => project.status === status);
  };

  const getTotalBudget = (): number => {
    return projects.reduce((total, project) => total + project.budget, 0);
  };

  const getTotalActualCost = (): number => {
    return projects.reduce((total, project) => total + project.actualCost, 0);
  };

  const getAverageProgress = (): number => {
    if (projects.length === 0) return 0;
    const totalProgress = projects.reduce(
      (total, project) => total + project.progress,
      0
    );
    return Math.round(totalProgress / projects.length);
  };

  return {
    projects,
    loading,
    error,
    refreshProjects,
    getProjectById,
    getProjectsByStatus,
    getTotalBudget,
    getTotalActualCost,
    getAverageProgress,
  };
}
