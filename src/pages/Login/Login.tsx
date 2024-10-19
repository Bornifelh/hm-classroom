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
  import { useHistory } from "react-router-dom"; // Ajoute ceci pour la navigation
  import { motion } from 'framer-motion';
  const Login: React.FC = () => {
    const [login_eleve, setLoginEleve] = useState<string>("");
    const [pass_eleve, setPassword] = useState<string>("");
    const [presentToast] = useIonToast();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const history = useHistory(); // Hook pour gérer la navigation

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://hmproges.online/backendhmclassroom/user_login.php', {
                login_eleve,
                pass_eleve
            });
    
            console.log('Réponse de l\'API:', response.data); // Vérifie le contenu de la réponse
    
            if (response.data.success) {
                const userData = {
                    nom_eleve: response.data.nom_eleve,
                    login_eleve: response.data.login_eleve,
                    id_eleve: response.data.id_eleve,
                    date_souscription: response.data.date_souscription,
                    fin_souscription: response.data.fin_souscription,
                    abonnement: response.data.abonnement,
                    id_niveau: response.data.id_niveau,
                    image_profile_eleve: response.data.image_profile_eleve
                };
            
                localStorage.setItem('user', JSON.stringify(userData));  // Stockage des données
                window.location.href = '/Accueil';
            }
             else {
                setAlertMessage(response.data.message);
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage('Erreur de connexion. Veuillez réessayer.');
            setShowAlert(true);
        }
    };
    
    const [toggle, setToggle] = useState(true);
    
  
    return (
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: toggle ? 0 : '-100vw' }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', height: '100vh', backgroundColor: '#000'}}
      >
      <IonPage>
        <IonContent>
          <div className="content-login">
            <img className="img-login" src={logoHMC} alt="Logo HM Classroom" />
  
            <section className="input-user-compte">
              <IonInput
                // fill="outline"
                label="Utilisateur"
                labelPlacement="floating"
                placeholder="Utilisateur"
                value={login_eleve}
                onIonChange={(e) => setLoginEleve(e.detail.value!)}
              />
            </section>
  
            <section className="input-user-password">
              <IonInput
                // fill="outline"
                type="password"
                label="Mot de passe"
                labelPlacement="floating"
                placeholder="Mot de passe"
                value={pass_eleve}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </section>
            {/* <button className="btn-reset-pass">Mot de passe oublié ?</button> */}

  
            <section className="btn-user-login">
              <IonButton fill="outline" onClick={handleLogin}>
                Se connecter
              </IonButton>
            </section>
  
            <section className="btn-user-help">
              <IonButton fill="clear">Besoin d'aide ?</IonButton>
            </section>
  
            <section className="btn-user-register">
              <IonButton fill="clear" routerLink="/signup">
                <b>
                  Nouveau sur HM CLASSROOM? <br />
                  S'inscrire
                </b>
              </IonButton>
            </section>
  
            <label className="text-bas">
              La protection de connexion est assurée par Google reCAPTCHA. assurez-vous de ne pas être un bot
            </label>
          </div>
  
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Informations"}
            message={alertMessage}
            buttons={["OK"]}
          />
        </IonContent>
      </IonPage>
      </motion.div>
      </div>
    );
  };
  
  export default Login;
