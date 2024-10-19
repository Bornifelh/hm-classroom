import React from "react";
import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRadio, IonRadioGroup, IonToolbar } from "@ionic/react";

const Erreur: React.FC = () => {
    return(
        <IonPage>
            <IonContent>
                <div>
                    <h5>Erreur lors du paiement</h5>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default Erreur;