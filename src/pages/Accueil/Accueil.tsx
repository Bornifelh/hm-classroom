import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import AccueilComponment from "./AccueilComponment";
import Header from "../Header/Header";


const Accueil : React.FC = () => {
    return(
        <IonPage>
            {/* <Header/> */}
            <IonContent  fullscreen>
                <div className="div-content-searchbar">
                    <IonSearchbar placeholder="Recherche cours..."></IonSearchbar>
                </div>
                <AccueilComponment/>
            </IonContent>
        </IonPage>
    )
}
export default Accueil;