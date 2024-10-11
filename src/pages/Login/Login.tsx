import {
    IonAlert,
    IonButton,
    IonContent,
    IonInput,
    IonPage,
    useIonToast,
  } from "@ionic/react";
  import React, { useState } from "react";
  import './Login.css';
  import logoHMC from './logo.jpg';
import axios from "axios";
  
  const Login: React.FC = () => {
    const [login_eleve, setIdentifier] = useState<string>("");
    const [pass_eleve, setPassword] = useState<string>("");
    const [presentToast] = useIonToast();
    const [showAlert, setShowAlert] = useState(false);
    
    const [alertMessage, setAlertMessage] = useState<string>('');
  
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost/backendhmclassroom/user_login.php', {
                login_eleve,
                pass_eleve
            });
      
            if (response.data.success) {
              // Rediriger vers la page d'accueil après une connexion réussie
             
              window.location.href = '/Accueil';
            } else {
              setAlertMessage(response.data.message);
              setShowAlert(true);
            }
          } catch (error) {
            setAlertMessage('Erreur de connexion. Veuillez réessayer.');
            setShowAlert(true);
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
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Informations'}
          message={alertMessage}
          buttons={['OK']}
        />


        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  