import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useHistory } from 'react-router-dom';


const Notifications : React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonNavLink routerDirection="forward" component={() => <Notifications />}>
                  <IonButton fill='clear' href="/"> <IonIcon icon={chevronBack}></IonIcon> Retour</IonButton>
                </IonNavLink>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem inventore dolorem esse officiis dolores mollitia consequuntur odio totam corrupti est ipsa accusamus eveniet repellat maiores quaerat quam id, impedit recusandae?</h1>
            </IonContent>
        </IonPage>
    )
}
export default Notifications;