import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import React from "react";
import Header from "../Header/Header";
import { chatboxEllipses, helpCircle, notifications, notificationsCircle, person, personCircle, qrCode, reader, school, server, sunny, wallet } from "ionicons/icons";
import './Compte.css'

const Compte : React.FC = () =>{
    return(
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
                        <img src={person} alt="" />
                        <h2>Derly MOUPEPIDI</h2>
                        <IonLabel>moupepidid@gmail.com</IonLabel>
                    </div>
                    <div className="content-settings">
                        <IonList>
                            <IonItem>
                                <IonIcon src={personCircle}></IonIcon><label>Mon profil</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={notificationsCircle}></IonIcon><label>Notifications</label>
                            </IonItem>
                            <IonItem>
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
                                <IonIcon src={server}></IonIcon><label>Abonnement</label>
                            </IonItem>
                        </IonList>

                        <IonList>
                            <IonItem>
                                <IonIcon src={chatboxEllipses}></IonIcon><label>Poser une question</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={helpCircle}></IonIcon><label>FAQ HM CLASSROOM</label>
                            </IonItem>
                            <IonItem>
                                <IonIcon src={sunny}></IonIcon><label>Fonctionnalités</label>
                            </IonItem>
                        </IonList>
                    </div>
            </div>
                
            </IonContent>
        </IonPage>
    )
}
export default Compte;