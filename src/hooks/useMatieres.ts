import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Matiere } from '../types';

// Hook pour récupérer les matières par niveau
export const useMatieres = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['matieres', user?.id_niveau],
    queryFn: () => apiService.getMatieresByNiveau(user!.id_niveau),
    enabled: !!user?.id_niveau,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (anciennement cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook pour récupérer les détails d'une matière
export const useMatiereDetails = (matiereId: number) => {
  return useQuery({
    queryKey: ['matiere', matiereId],
    queryFn: () => apiService.getMatiereDetails(matiereId),
    enabled: !!matiereId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 heure (anciennement cacheTime)
    retry: 2,
  });
};

// Hook pour récupérer la liste des cours d'une matière
export const useCoursList = (matiereId: number) => {
  return useQuery({
    queryKey: ['cours-list', matiereId],
    queryFn: () => apiService.getCoursList(matiereId),
    enabled: !!matiereId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes (anciennement cacheTime)
    retry: 2,
  });
};

// Hook pour rechercher dans les matières
export const useMatieresSearch = (searchTerm: string) => {
  const { data: matieres, isLoading, error } = useMatieres();
  
  const filteredMatieres = matieres?.filter((matiere: Matiere) =>
    matiere.nom_matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    matiere.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  return {
    data: filteredMatieres,
    isLoading,
    error,
  };
}; 