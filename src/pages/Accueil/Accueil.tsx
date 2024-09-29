import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import AccueilComponment from "./AccueilComponment";


const Accueil : React.FC = () => {
    return(
        <IonPage>
            <IonContent>
            <AccueilComponment/>
            </IonContent>
        </IonPage>
    )
}
export default Accueil;