import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonLabel, IonPage, IonTitle } from "@ionic/react";
import React from "react";
import "./Accueil.css"


const AccueilComponment : React.FC = () => {
    return(
        <div className="content-formation-accueil ion-padding">
            <a href="./DetailsFormation">
                <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" srcSet="" />
            </a>

            <a href="./DetailsFormation">
                <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" srcSet="" />
            </a>

            <a href="./DetailsFormation">
                <img src="https://www.bienenseigner.com/wp-content/uploads/2021/02/comment-rendre-un-cours-plus-attractif.jpg" alt="" srcSet="" />
            </a>
        </div>
    )
}
export default AccueilComponment;