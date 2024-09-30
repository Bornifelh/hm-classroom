import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNavLink, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import "./Details.css"
import { chevronBack, easel, navigateCircle, star, time } from "ionicons/icons";

const DetailsFormation : React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                  <IonButton fill='clear' href="/"> <IonIcon icon={chevronBack}></IonIcon> Retour</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <img src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" srcSet="" />
                <div className="content-details-formation-detail">
                    <section className="formation-niveau-prof">
                        <h3>Cours de Mathematique</h3>
                        <h5>Niveau 3ème</h5>
                        <p>Professeur : <b>Derly MOUPEPIDI</b></p>
                    </section>
                    
                    <div className="lessons-duree">
                        <section>
                            <IonIcon src={easel}></IonIcon>
                            <IonLabel>9 Leçons</IonLabel>
                        </section>
                        <section>
                            <IonIcon src={star}></IonIcon>
                            <IonLabel>4.7 (3.6k+)</IonLabel>
                        </section>
                        <section>
                            <IonIcon src={time}></IonIcon>
                            <IonLabel>2 Semaines</IonLabel>
                        </section>
                    </div>
                    <div className="details-formation">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis iure minus facilis tenetur dicta ipsum libero pariatur animi saepe vel vitae ipsa doloremque eveniet accusamus eos, aliquid voluptas rerum?</p>
                        <h5>Ce que vous apprendrez :</h5>
                        <section className="list-lessons">

                            <a className="lessons-link" href="#">
                                <div className="content-svg-title-lessons">
                                <img className="svg-lessons" src={navigateCircle}></img>
                                <p>Ecritures d'un nombre. Cours 1</p>
                                </div>
                                
                                <img className="portrait-videos" src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            </a>

                            <a className="lessons-link" href="#">
                                <div className="content-svg-title-lessons">
                                <img className="svg-lessons" src={navigateCircle}></img>
                                <p>Ecritures d'un nombre. Cours 2</p>
                                </div>
                                
                                <img className="portrait-videos" src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            </a>

                            <a className="lessons-link" href="#">
                                <div className="content-svg-title-lessons">
                                <img className="svg-lessons" src={navigateCircle}></img>
                                <p>Ecritures d'un nombre. Cours 3</p>
                                </div>
                                
                                <img className="portrait-videos" src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            </a>

                            <a className="lessons-link" href="#">
                                <div className="content-svg-title-lessons">
                                <img className="svg-lessons" src={navigateCircle}></img>
                                <p>Ecritures d'un nombre. Cours 4</p>
                                </div>
                                
                                <img className="portrait-videos" src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd" alt="" />
                            </a>

                            
                        </section>
                    </div>


                </div>
            </IonContent>
        </IonPage>
    )
}
export default DetailsFormation;