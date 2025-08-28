import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types";

// Hook pour récupérer les données utilisateur
export const useUser = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user", user?.id_eleve],
    queryFn: () => apiService.getUserData(user!.id_eleve),
    enabled: !!user?.id_eleve,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook pour mettre à jour les données utilisateur
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (userData: User) => Promise.resolve(userData), // Simulation d'une API de mise à jour
    onSuccess: (userData) => {
      // Mettre à jour le cache
      queryClient.setQueryData(["user", userData.id_eleve], userData);
      // Mettre à jour le contexte d'authentification
      updateUser(userData);
    },
  });
};

// Hook pour vérifier la connexion
export const useConnectionStatus = () => {
  return useQuery({
    queryKey: ["connection"],
    queryFn: () => apiService.checkConnection(),
    staleTime: 30 * 1000, // 30 secondes
    gcTime: 60 * 1000, // 1 minute (anciennement cacheTime)
    retry: 2,
    retryDelay: 1000,
  });
};
