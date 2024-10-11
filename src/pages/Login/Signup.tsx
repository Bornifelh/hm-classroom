import {
    IonAlert,
    IonButton,
    IonContent,
    IonInput,
    IonPage,
    IonRouterLink,
    useIonToast,
  } from "@ionic/react";
  import React, { useState } from "react";
  import './Signup.css';
import axios from "axios";
  
  const Signup: React.FC = () => {
    const [nom_eleve, setNomEleve] = useState<string>("");
    const [login_eleve, setLoginEleve] = useState<string>("");
    const [pass_eleve, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [infos_apareil, setInfosAppareil] = useState<string>("Mobile");
    const [dateSouscription, setDateSouscription] = useState<string>("");
    const [finSouscription, setFinSouscription] = useState<string>("");
    const [presentToast] = useIonToast();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
  
    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost/backendhmclassroom/user_signup.php', {
                nom_eleve,
                login_eleve,
                pass_eleve,
                infos_apareil,
                date_souscription: dateSouscription,
                fin_souscription: finSouscription
            });
      
            if (response.data.success) {
              window.location.href = '/Login';

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
          <div className="content-signup">
            <h2>Créer un compte</h2>
  
            <section className="input-signup-name">
              <IonInput
                fill="outline"
                label="Nom complet"
                labelPlacement="floating"
                placeholder="Nom complet"
                value={nom_eleve}
                onIonChange={(e) => setNomEleve(e.detail.value!)}
              />
            </section>
  
            <section className="input-signup-username">
              <IonInput
                fill="outline"
                label="Nom d'utilisateur"
                labelPlacement="floating"
                placeholder="Nom d'utilisateur"
                value={login_eleve}
                onIonChange={(e) => setLoginEleve(e.detail.value!)}
              />
            </section>
  
            <section className="input-signup-password">
              <IonInput
                fill="outline"
                type="password"
                label="Mot de passe"
                labelPlacement="floating"
                placeholder="Mot de passe"
                value={pass_eleve}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </section>
  
            <section className="input-signup-confirm-password">
              <IonInput
                fill="outline"
                type="password"
                label="Confirmer mot de passe"
                labelPlacement="floating"
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              />
            </section>
  
            <section className="btn-user-signup">
              <IonButton fill="outline" onClick={handleSignup}>
                S'inscrire
              </IonButton>
            </section>
          </div>
          <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Information'}
          message={alertMessage}
          buttons={['OK']}
        />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Signup;
  