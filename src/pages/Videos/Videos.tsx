import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../Header/Header";

const Videos : React.FC = () =>{
    return(
        <IonPage>
            <Header/>
            <IonContent className="ion-padding">
                <h1>Videos</h1>
            </IonContent>
        </IonPage>
    )
}
export default Videos;