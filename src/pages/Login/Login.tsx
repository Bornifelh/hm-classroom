import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import './Login.css';
import logoHMC from '../Accueil/LOGO HM CLASSROOM.ai 01_Plan de travail 1 copie 2.jpg';

const Login : React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Se connecter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="content-login">
                  <img className="img-login" src={logoHMC}/>

                    <section className="input-user-compte">
                        <IonInput fill="outline" label="E-mail ou Numéro de phone" labelPlacement="floating" placeholder="E-mail ou Numéro de phone"></IonInput>
                    </section>
                    <section className="input-user-password">
                        <IonInput fill="outline" type="password" label="Mot de passe" labelPlacement="floating" placeholder="Mot de passe"></IonInput>
                        <button className="btn-reset-pass">Mot de passe oublié ?</button>
                    </section>
                    <section className="btn-user-login">
                        <IonButton fill="outline">Se connecter</IonButton>
                    </section>
                    <section className="btn-user-help">
                        <IonButton fill="clear">Besoin d'aide ?</IonButton>
                    </section>
                    <section className="btn-user-register">
                        <IonButton fill="clear"><b>Nouveau sur  HM CLASSROOM? <br />S'inscrire</b></IonButton>
                    </section>
                    <label className="text-bas">
                        La protection de connexion est assurée par Google reCAPTCHA. assurez vous ne pas être un bot
                    </label>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Login;