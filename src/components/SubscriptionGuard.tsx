import React from "react";
import { IonSpinner } from "@ionic/react";
import { useSubscription } from "../hooks/useSubscription";
import "./SubscriptionGuard.css";

interface SubscriptionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showExpiredMessage?: boolean;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({
  children,
  fallback,
  showExpiredMessage = true,
}) => {
  const { isActive, isExpired, daysRemaining, shouldRedirect } =
    useSubscription();

  // Si l'abonnement est actif, afficher le contenu
  if (isActive) {
    return <>{children}</>;
  }

  // Si l'abonnement est expiré et qu'on doit rediriger
  if (shouldRedirect) {
    return (
      <div className="subscription-expired">
        <IonSpinner name="crescent" />
        {showExpiredMessage && <p>Redirection vers la page d'abonnement...</p>}
      </div>
    );
  }

  // Si un fallback personnalisé est fourni
  if (fallback) {
    return <>{fallback}</>;
  }

  // Affichage par défaut pour les utilisateurs en période d'essai
  return (
    <div className="subscription-trial">
      <p>Période d'essai : {daysRemaining} jours restants</p>
      {children}
    </div>
  );
};
