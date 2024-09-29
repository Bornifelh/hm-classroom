import { IonButton, IonCol, IonHeader, IonIcon, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import React from "react";
import Notifications from "../Notifications/Notifications";

const Header : React.FC = () =>{
    return(
        <IonHeader>
      <IonToolbar>
        <IonTitle>
          <IonRow>
              <IonCol size=''><IonTitle>HM CLASSROOM</IonTitle></IonCol>
              <IonCol size='auto'>
                <IonButton routerLink='./Notifications'>
                  <IonIcon src={notifications}></IonIcon>
                </IonButton>
              </IonCol>
          </IonRow>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    )
}
export default Header;