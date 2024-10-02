import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../Header/Header";

const Compte : React.FC = () =>{
    return(
        <IonPage>
            <Header/>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    )
}
export default Compte;