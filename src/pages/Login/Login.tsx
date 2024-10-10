import {
    IonButton,
    IonContent,
    IonInput,
    IonPage,
    useIonToast,
  } from "@ionic/react";
  import React, { useState } from "react";
  import './Login.css';
  import logoHMC from './logo.jpg';
  
  const Login: React.FC = () => {
    const [login_eleve, setIdentifier] = useState<string>("");
    const [pass_eleve, setPassword] = useState<string>("");
    const [presentToast] = useIonToast();
  
    const handleLogin = async () => {
      if (!login_eleve || !pass_eleve) {
        presentToast({
          message: "Veuillez remplir tous les champs",
          duration: 2000,
          position: "top",
        });
        return;
      }
  
      const API_URL = 'http://localhost/backendhmclassroom/user_login.php'; 
  
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin:": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": " Content-Type, Authorization"
          },
          body: JSON.stringify({
            login_eleve, 
            pass_eleve,
          }),
        });
  
        const result = await response.json();
        
        if (response.ok) {
          presentToast({
            message: "Connexion réussie !",
            duration: 2000,
            position: "top",
          });
        } else {
          presentToast({
            message: result.message || "Échec de la connexion. Veuillez réessayer.",
            duration: 2000,
            position: "top",
          });
        }
      } catch (error) {
        presentToast({
          message: "Erreur réseau. Veuillez réessayer.",
          duration: 2000,
          position: "top",
        });
      }
    };
  
    return (
      <IonPage>
        <IonContent>
          <div className="content-login">
            <img className="img-login" src={logoHMC} alt="Logo HM Classroom" />
  
            <section className="input-user-compte">
              <IonInput
                fill="outline"
                label="Utilisateur"
                labelPlacement="floating"
                placeholder="Utilisateur"
                value={login_eleve}
                onIonChange={(e) => setIdentifier(e.detail.value!)}
              />
            </section>
  
            <section className="input-user-password">
              <IonInput
                fill="outline"
                type="password"
                label="Mot de passe"
                labelPlacement="floating"
                placeholder="Mot de passe"
                value={pass_eleve}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <button className="btn-reset-pass">Mot de passe oublié ?</button>
            </section>
  
            <section className="btn-user-login">
              <IonButton fill="outline" onClick={handleLogin}>
                Se connecter
              </IonButton>
            </section>
  
            <section className="btn-user-help">
              <IonButton fill="clear">Besoin d'aide ?</IonButton>
            </section>
  
            <section className="btn-user-register">
              <IonButton fill="clear">
                <b>
                  Nouveau sur HM CLASSROOM? <br />
                  S'inscrire
                </b>
              </IonButton>
            </section>
  
            <label className="text-bas">
              La protection de connexion est assurée par Google reCAPTCHA. assurez-vous ne pas être un bot
            </label>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  