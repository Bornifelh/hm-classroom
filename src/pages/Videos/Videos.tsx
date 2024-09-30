import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../Header/Header";
import "./Videos.css";
import { checkmarkDoneCircle } from "ionicons/icons";

const Videos : React.FC = () =>{
    return(
        <IonPage>
            <Header/>
            <IonContent className="ion-padding">
                <h3>Vidéo(s) téléchargé(e)s</h3>
                <div>
                    <a href="" className="link-videos">
                        <section className="img-title">
                        <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            <section className="title-duree">
                                <h5>Équations lineaires</h5>
                                <label>28min | 96MB </label>
                            </section>
                        </section>
                        <img className="svg-icon" src={checkmarkDoneCircle} alt="" />
                    </a>

                    <a href="" className="link-videos">
                        <section className="img-title">
                        <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            <section className="title-duree">
                                <h5>Équations lineaires</h5>
                                <label>28min | 96MB </label>
                            </section>
                        </section>
                        <img className="svg-icon" src={checkmarkDoneCircle} alt="" />
                    </a>

                    <a href="" className="link-videos">
                        <section className="img-title">
                        <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            <section className="title-duree">
                                <h5>Équations lineaires</h5>
                                <label>28min | 96MB </label>
                            </section>
                        </section>
                        <img className="svg-icon" src={checkmarkDoneCircle} alt="" />
                    </a>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Videos;