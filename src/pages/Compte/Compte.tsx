import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRouterLink,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  chatboxEllipses,
  close,
  closeCircle,
  helpCircle,
  lockClosed,
  notificationsCircle,
  personCircle,
  power,
  qrCode,
  reader,
  school,
  server,
  sunny,
  wallet,
} from "ionicons/icons";
import "./Compte.css";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { useHistory } from "react-router";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../hooks/useUser";
import { apiService } from "../../services/api";
import axios from "axios";

interface Video {
  id: number;
  title: string;
  filePath: string;
  imgPochette: string;
}

const Compte: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { user, logout } = useAuth();
  const { data: userData, isLoading: loading } = useUser();
  const [niveau, setNiveau] = useState<NiveauEleve>();
  const [abonnement, setAbonnement] = useState<string>("Inactif");
  const [videos, setVideos] = useState<Video[]>([]);
  const history = useHistory();

  interface NiveauEleve {
    id_niveau: number;
    nom_niveau: string;
    pochette_niveau: string;
  }

  // Suppression de ce useEffect car useUser() gère déjà les données utilisateur

  const setShowInput = () => {
    if (user && user.abonnement === 1) {
      setAbonnement("Actif");
    } else {
      setAbonnement("Inactif");
    }
  };

  useEffect(() => {
    // Assure-toi que 'user' est bien défini avant d'appeler la fonction
    if (user) {
      setShowInput();
    }
  }, [user]);

  useEffect(() => {
    const fetchNiveauEleve = async () => {
      if (user && user.id_niveau) {
        try {
          const response = await apiService.getNiveauEleve(user.id_niveau);
          setNiveau(response);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de la matière:",
            error
          );
        }
      } else {
        console.error("L'utilisateur ou l'id_niveau n'est pas défini.");
      }
    };

    fetchNiveauEleve();
  }, [user]);

  const handleLogout = () => {
    logout();
    history.push("/Login");
  };

  const openWhatsApp = () => {
    const phoneNumber = "+24177683855";
    const message = encodeURIComponent(
      "Bonjour, Merci de contacter HM CLASSROOM."
    );

    // Créer l'URL pour ouvrir WhatsApp avec le numéro et le message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Rediriger vers l'URL de WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const clearStorage = async () => {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: "videos.db",
        location: "default",
      });

      // Suppression de toutes les vidéos de la table
      await db.executeSql("DELETE FROM videos", []);
      alert("Le stockage des vidéos a été nettoyé.");

      // Mettre à jour l'état pour vider la liste affichée
      setVideos([]);
    } catch (error) {
      console.error("Erreur lors du nettoyage du stockage :", error);
    }
  };

  // Modal profile

  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const [canDismiss, setCanDismiss] = useState(true);

  // async function canDismiss(data?: any, role?: string) {
  //   return role !== 'gesture';
  // }

  const openWebView = async () => {
    await Browser.open({
      url: `https://hmproges.online/hm_classroom_pay/index.html?id=${user?.id_eleve}`,
    });
  };
  // console.log(user.fin_essaie);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="content-all">
          <div className="content-button">
            <IonButton fill="clear">
              <IonIcon src={qrCode}></IonIcon>
            </IonButton>
          </div>
          <div className="content-profile">
            {user ?
              <>
                <img src={user.image_profile_eleve} alt="Profile Icon" />
                <h2>{user.nom_eleve}</h2>{" "}
                {/* Affiche le nom de l'utilisateur */}
                <IonLabel>Abonnement : {abonnement}</IonLabel>
                {/* <label id="periode-essaie">Fin d'essiaie le : {user.fin_essaie}</label> */}
                {/* <IonLabel>Votre niveau : {niveau?.nom_niveau}</IonLabel> */}
              </>
            : <h2>Utilisateur non connecté</h2>}
          </div>
          <div className="content-settings">
            <IonList>
              {/* <IonItem id="open-modal" lines="full">
                                <IonIcon src={personCircle}></IonIcon><label>Mon profile</label>
                            </IonItem> */}
              {/* <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={notificationsCircle}></IonIcon><label>Notifications</label>
                            </IonItem> */}
              <IonItem lines="full">
                <a
                  onClick={openWebView}
                  style={{ textDecoration: "none" }}
                  // href={`https://hmproges.online/hm_classroom_pay/index.html?id=${user?.id_eleve}`}
                  // target="_blank"
                  rel="noopener noreferrer">
                  <IonIcon src={wallet}></IonIcon>
                  <label>Abonnement</label>
                </a>
              </IonItem>
            </IonList>

            <IonList>
              {/* <IonItem onClick={openWhatsApp}>
                                <IonIcon src={school}></IonIcon><label>Mon score</label>
                            </IonItem> */}
              {/* <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={reader}></IonIcon><label>Cours lus</label>
                            </IonItem> */}
              <IonItem lines="full" onClick={openWhatsApp}>
                <IonIcon src={chatboxEllipses}></IonIcon>
                <label>Poser une question</label>
              </IonItem>
              <IonItem lines="full" onClick={clearStorage}>
                <IonIcon src={server}></IonIcon>
                <label>Nettoyage du stockage</label>
              </IonItem>
            </IonList>

            <IonList>
              <IonItem lines="full" onClick={openWhatsApp}>
                <IonIcon src={helpCircle}></IonIcon>
                <label>FAQ HM CLASSROOM</label>
              </IonItem>
              {/* <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={sunny}></IonIcon><label>Fonctionnalités</label>
                            </IonItem> */}
              <IonItem lines="full" onClick={handleLogout}>
                <IonIcon src={power}></IonIcon>
                <label>Se déconnecter</label>
              </IonItem>
            </IonList>
          </div>
        </div>

        <IonModal ref={modal} trigger="open-modal" canDismiss={canDismiss}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mon profile</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  <IonIcon src={closeCircle}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonImg src={user?.image_profile_eleve} alt={user?.nom_eleve} />
            <div className="content-name-number-maodal">
              <h4>{user?.nom_eleve}</h4>
              <h5>{user?.login_eleve}</h5>
              {/* <IonButton routerLink={`/modifcompte/${user?.id_eleve}`} fill="outline">
              Modifier
          </IonButton> */}
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Compte;
