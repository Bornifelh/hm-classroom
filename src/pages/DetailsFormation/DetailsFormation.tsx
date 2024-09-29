import { IonButton, IonContent, IonHeader, IonIcon, IonNavLink, IonPage, IonToolbar } from "@ionic/react";
import React from "react";
import Notifications from "../Notifications/Notifications";
import { chevronBack } from "ionicons/icons";

const DetailsFormation : React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                  <IonButton fill='clear' href="/"> <IonIcon icon={chevronBack}></IonIcon> Retour</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" srcSet="" />
            </IonContent>
        </IonPage>
    )
}
export default DetailsFormation;