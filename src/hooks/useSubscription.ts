import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export interface SubscriptionStatus {
  isActive: boolean;
  isExpired: boolean;
  daysRemaining: number;
  shouldRedirect: boolean;
}

export const useSubscription = (): SubscriptionStatus => {
  const { user } = useAuth();
  const history = useHistory();
  const [status, setStatus] = useState<SubscriptionStatus>({
    isActive: false,
    isExpired: false,
    daysRemaining: 0,
    shouldRedirect: false,
  });

  useEffect(() => {
    if (!user) {
      setStatus({
        isActive: false,
        isExpired: true,
        daysRemaining: 0,
        shouldRedirect: true,
      });
      return;
    }

    const today = new Date();
    const finEssai = new Date(user.fin_essaie);
    const daysRemaining = Math.ceil(
      (finEssai.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    const isExpired = user.abonnement === 0 && daysRemaining < 0;
    const isActive =
      user.abonnement === 1 || (user.abonnement === 0 && daysRemaining >= 0);

    setStatus({
      isActive,
      isExpired,
      daysRemaining: Math.max(0, daysRemaining),
      shouldRedirect: isExpired,
    });

    // Redirection automatique si l'abonnement est expiré
    if (isExpired) {
      const timer = setTimeout(() => {
        alert(
          "Votre période d'essai a expiré. Veuillez souscrire à un abonnement pour continuer."
        );
        history.push("/Compte");
      }, 1000); // Délai de 1 seconde pour éviter les redirections trop brutales

      return () => clearTimeout(timer);
    }
  }, [user, history]);

  return status;
};
