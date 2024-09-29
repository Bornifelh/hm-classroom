import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonLabel, IonPage, IonTitle } from "@ionic/react";
import React from "react";
import "./Accueil.css"


const AccueilComponment : React.FC = () => {
    return(
        <div className="content-formation-accueil">
            <IonCard routerLink="./DetailsFormation">
                <IonCardHeader>
                    <IonTitle>Formation : CM2</IonTitle>
                </IonCardHeader>
                <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" srcSet="" />
                <div className="ion-padding">
                <IonLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit. A laboriosam ea facere quas sint ipsa mollitia, doloremque voluptatum unde</IonLabel>
                </div>
            </IonCard>

            <IonCard routerLink="./DetailsFormation">
                <IonCardHeader>
                    <IonTitle>Formation : Terminal A/B</IonTitle>
                </IonCardHeader>
                <img src="https://www.bienenseigner.com/wp-content/uploads/2021/02/comment-rendre-un-cours-plus-attractif.jpg" alt="" srcSet="" />
                <div className="ion-padding">
                <IonLabel>Lorem ipsum dolor sit amet consectetur adipisicing elit. A laboriosam ea facere quas sint ipsa mollitia, doloremque voluptatum unde</IonLabel>
                </div>
            </IonCard>
        </div>
    )
}
export default AccueilComponment;