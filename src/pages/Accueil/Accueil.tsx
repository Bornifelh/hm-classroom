import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import AccueilComponment from "./AccueilComponment";
import Header from "../Header/Header";


const Accueil : React.FC = () => {
    return(
        <IonPage>
            <Header/>
            <IonContent className="ion-padding" fullscreen>
                <IonTitle>Accueil</IonTitle>
                <AccueilComponment/>
            </IonContent>
        </IonPage>
    )
}
export default Accueil;