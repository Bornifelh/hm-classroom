import { IonButton, IonCol, IonFab, IonFabButton, IonHeader, IonIcon, IonLabel, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import React from "react";
import Notifications from "../Notifications/Notifications";

const Header : React.FC = () =>{
    return(
    //     <IonHeader>
    //   <IonToolbar>
    //     <IonTitle>
    //       <IonRow>
    //           <IonCol size=''></IonCol>
    //           <IonCol size='auto'>
    //             <IonButton routerLink='./Notifications'>
    //               <IonIcon src={notifications}></IonIcon>
    //             </IonButton>
    //           </IonCol>
    //       </IonRow>
    //     </IonTitle>
    //   </IonToolbar>
    // </IonHeader>

    <IonFab  slot="fixed" vertical="top" horizontal="end">
      <IonFabButton routerLink="./Notifications">
      <IonIcon src={notifications}></IonIcon><IonLabel>2</IonLabel>
      </IonFabButton>

    </IonFab>
    )
}
export default Header;