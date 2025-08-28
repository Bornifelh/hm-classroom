import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
} from "@ionic/react";
import React, { useEffect } from "react";
import "./Accueil.css";
import logoHM from "../Login/logo.jpg";
import { useHistory } from "react-router";
import { Browser } from "@capacitor/browser";
import { useAuth } from "../../contexts/AuthContext";
import { useMatieres } from "../../hooks/useMatieres";

const AccueilComponment: React.FC = () => {
  const { user } = useAuth();
  const { data: matiere, isLoading: loading, error } = useMatieres();

  // Gestion de l'affichage du bouton d'abonnement
  useEffect(() => {
    const ButtonAbonement = document.getElementById("btnAbonnement");
    if (ButtonAbonement) {
      if (user && user.abonnement == 0) {
        ButtonAbonement.style.display = "flex";
      } else {
        ButtonAbonement.style.display = "none";
      }
    }
  }, [user]);

  const openWebView = async () => {
    await Browser.open({
      url: `https://hmproges.online/hm_classroom_pay/?id=${user?.id_eleve}`,
    });
  };

  if (loading) {
    return (
      <div className="spin-content">
        <img src={logoHM} alt="" />
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-content">
        <p>Erreur lors du chargement des matières</p>
        <IonButton onClick={() => window.location.reload()}>
          Réessayer
        </IonButton>
      </div>
    );
  }

  return (
    <>
      <div className="content-formation-accueil">
        {matiere?.map((matieres) => (
          <a href={`/details/${matieres.id_matiere}`} key={matieres.id_matiere}>
            <img src={matieres.pochette_matiere} alt={matieres?.nom_matiere} />
          </a>
        ))}
      </div>

      {/* <a
        id="btnAbonnement"
        style={{ textDecoration: "none" }}
        onClick={openWebView}>
        Abonnez-vous
      </a> */}
    </>
  );
};

export default AccueilComponment;
