import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { chatboxEllipses, helpCircle, notificationsCircle, personCircle, power, qrCode, reader, school, server, sunny, wallet } from "ionicons/icons";
import './Compte.css';
import axios from "axios";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";


interface Video {
    id: number;
    title: string;
    filePath: string;
    imgPochette: string;
  }

const Compte: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    const [user, setUser] = useState<any>(null);
    const [niveau, setNiveau] = useState<NiveauEleve>();
    const [abonnement, setAbonnement] = useState<string>("Inactif"); 
    const [loading, setLoading] = useState<boolean>(true);
    const [videos, setVideos] = useState<Video[]>([]);



    interface NiveauEleve{
        id_niveau: number;
        nom_niveau: string;
        pochette_niveau: string; 
    }

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser); 
        }
    }, []);

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
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }, []);

      useEffect(() => {
        const fetchNiveauEleve = async () => {
          if (user && user.id_niveau) {
            try {
              const response = await axios.get(`https://hmproges.online/backendhmclassroom/recup_niveau_eleve.php?id_niveau=${user.id_niveau}`);
            //   console.log(user.id_niveau);
              setNiveau(response.data);
            } catch (error) {
              console.error("Erreur lors de la récupération des détails de la matière:", error);
            } finally {
              setLoading(false);
            }
          } else {
            console.error("L'utilisateur ou l'id_niveau n'est pas défini.");
          }
        };
    
        fetchNiveauEleve();
      }, [user]);
      

    const handleLogout = () => {
        localStorage.removeItem('user');
        
        window.location.href = '/login';  
    };

    const openWhatsApp = () => {
        const phoneNumber = '+24177683855'; 
        const message = encodeURIComponent('Bonjour, Merci de contacter HM CLASSROOM.');
        
        // Créer l'URL pour ouvrir WhatsApp avec le numéro et le message
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Rediriger vers l'URL de WhatsApp
        window.open(whatsappUrl, '_blank');
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
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <div className="content-all">
                    <div className="content-button">
                        <IonButton fill="clear">
                            <IonIcon src={qrCode}></IonIcon>
                        </IonButton>
                        <IonButton routerLink={`/modifcompte/${user?.id_eleve}`} fill="clear">
                            Modifier
                        </IonButton>
                    </div>
                    <div className="content-profile">
                        {user ? (
                            <>
                                <img src={user.image_profile_eleve} alt="Profile Icon" />

                                <h2>{user.nom_eleve}</h2>  {/* Affiche le nom de l'utilisateur */}
                                <IonLabel>Abonnement : {abonnement}</IonLabel>
                                {/* <IonLabel>Votre niveau : {niveau?.nom_niveau}</IonLabel> */}
                            </>
                        ) : (
                            <h2>Utilisateur non connecté</h2>
                            
                        )}
                    </div>
                    <div className="content-settings">
                        <IonList>
                            <IonItem lines="full">
                                <IonIcon src={personCircle}></IonIcon><label>Mon profil</label>
                            </IonItem>
                            <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={notificationsCircle}></IonIcon><label>Notifications</label>
                            </IonItem>
                            <IonItem lines="full" routerLink="/order">
                                <IonIcon src={wallet}></IonIcon><label>Abonnement</label>
                            </IonItem>
                        </IonList>

                        <IonList>
                        
                            {/* <IonItem onClick={openWhatsApp}>
                                <IonIcon src={school}></IonIcon><label>Mon score</label>
                            </IonItem> */}
                            <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={reader}></IonIcon><label>Cours lus</label>
                            </IonItem>
                            <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={chatboxEllipses}></IonIcon><label>Poser une question</label>
                            </IonItem>
                            <IonItem lines="full" onClick={clearStorage}>
                                <IonIcon src={server}></IonIcon><label>Nettoyage du stockage</label>
                            </IonItem>
                        </IonList>

                        <IonList>
                            
                            <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={helpCircle}></IonIcon><label>FAQ HM CLASSROOM</label>
                            </IonItem>
                            <IonItem lines="full" onClick={openWhatsApp}>
                                <IonIcon src={sunny}></IonIcon><label>Fonctionnalités</label>
                            </IonItem>
                            <IonItem lines="full" onClick={handleLogout}>
                                <IonIcon src={power}></IonIcon><label>Se déconnecter</label>
                            </IonItem>
                        </IonList>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Compte;
