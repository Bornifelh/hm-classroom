import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { chatboxEllipses, helpCircle, notificationsCircle, personCircle, power, qrCode, reader, school, server, sunny, wallet } from "ionicons/icons";
import './Compte.css';

const Compte: React.FC = () => {
    const [user, setUser] = useState<any>(null);  
    useEffect(() => {
        const modal = useRef<HTMLIonModalElement>(null);
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser); 
        }
    }, []);
    // const [actif, setActif] = useState<any>(null);
    // useEffect(()=>{
    //     if(user.abonnement==1){
    //         const abonnementActif = <p>Abonnement : Actif</p>
    //         setActif(abonnementActif)
    //     }
    //     else{
    //         const abonnementInactif = <p>Abonnement</p>
    //         setActif(abonnementInactif)

    //     }
    // })

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';  
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <div className="content-all">
                    <div className="content-button">
                        <IonButton fill="clear">
                            <IonIcon src={qrCode}></IonIcon>
                        </IonButton>
                        <IonButton fill="clear">
                            Modifier
                        </IonButton>
                    </div>
                    <div className="content-profile">
                        <img src={personCircle} alt="Profile Icon" />
                        {user ? (
                            <>
                                <h2>{user.nom_eleve}</h2>  {/* Affiche le nom de l'utilisateur */}
                                <IonLabel>Abonnement : {user.abonnement}</IonLabel> 
                            </>
                        ) : (
                            <h2>Utilisateur non connecté</h2>
                        )}
                    </div>
                    <div className="content-settings">
                        <IonList>
                            <IonItem>
                                <IonIcon src={personCircle}></IonIcon><label>Mon profil</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={notificationsCircle}></IonIcon><label>Notifications</label>
                            </IonItem>
                            <IonItem routerLink="/order">
                                <IonIcon src={wallet}></IonIcon><label>Abonnement</label>
                            </IonItem>
                        </IonList>

                        <IonList>
                            <IonItem>
                                <IonIcon src={school}></IonIcon><label>Mon score</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={reader}></IonIcon><label>Cours lus</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={chatboxEllipses}></IonIcon><label>Poser une question</label>
                            </IonItem>
                            {/* <IonItem>
                                <IonIcon src={server}></IonIcon><label>Stockage</label>
                            </IonItem> */}
                        </IonList>

                        <IonList>
                            
                            <IonItem>
                                <IonIcon src={helpCircle}></IonIcon><label>FAQ HM CLASSROOM</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={sunny}></IonIcon><label>Fonctionnalités</label>
                            </IonItem>
                            <IonItem onClick={handleLogout}>
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
