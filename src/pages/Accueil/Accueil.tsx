import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import AccueilComponment from "./AccueilComponment";
import { useAuth } from '../../contexts/AuthContext';


const Accueil: React.FC = () => {
    const { user } = useAuth();
    
    return(
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <AccueilComponment/>
            </IonContent>
        </IonPage>
    )
}
export default Accueil;