import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import './Signup.css';
import axios from "axios";
import { useHistory } from "react-router";
import logoHM from "../Login/logo.jpg";
import { eye } from "ionicons/icons";
import logoHMC from './logo.jpg';
import { motion } from 'framer-motion';



const Signup: React.FC = () => {
  const [nom_eleve, setNomEleve] = useState<string>("");
  const [login_eleve, setLoginEleve] = useState<string>("");
  const [pass_eleve, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [niveauFormation, setniveauFormation] = useState<string>("");
  const [infos_apareil, setInfosAppareil] = useState<string>("Mobile");
  const [dateSouscription, setDateSouscription] = useState<string>("");
  const [finSouscription, setFinSouscription] = useState<string>("");
  const [niveau, setNiveau] = useState<NiveauEleve[]>([]);
  const [selectedNiveau, setSelectedNiveau] = useState<number | null>(null);
  const [presentToast] = useIonToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  interface NiveauEleve {
    id_niveau: number;
    nom_niveau: string;
    pochette_niveau: string; 
  }

  const handleSignup = async () => {
    if (pass_eleve !== confirmPassword) {
        setAlertMessage("Les mots de passe ne correspondent pas.");
        setShowAlert(true);
        return;
    }

    setIsLoading(true);

    // Ajouter un délai avant d'effectuer la requête
    setTimeout(async () => {
        try {
            const response = await axios.post('https://hmproges.online/backendhmclassroom/user_signup.php', {
                nom_eleve,
                login_eleve,
                pass_eleve,
                infos_apareil,
                date_souscription: dateSouscription,
                fin_souscription: finSouscription,
                id_niveau: selectedNiveau
            });

            if (response.data.success) {
                history.push('/success');
            } else {
                setAlertMessage(response.data.message);
                setShowAlert(true);
            }
        } catch (error) {
            setAlertMessage('Erreur de connexion. Veuillez réessayer.');
            setShowAlert(true);
        } finally {
            setIsLoading(false); // Arrêter le chargement
        }
    }, 10000);
};


  useEffect(() => {
      const fetchNiveau = async () => {
          try {
              const response = await axios.get('https://hmproges.online/backendhmclassroom/get_niveau_signup.php');
              setNiveau(response.data);
          } catch (error) {
              console.error("Erreur lors de la récupération des niveaux:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchNiveau();
  }, []); // Appel unique lors du montage du composant

  const [toggle, setToggle] = useState(true);

  const handlerPushMain = () =>{
    history.push('/Login')
  }

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

        <div className="content-signup">
        {isLoading && <div className="spinner"></div>}
        <img className="img-login" src={logoHMC} alt="Logo HM Classroom" />

        <h2 className="text-titre">Créer votre compte</h2>

          

          <section className="input-signup-name">
            <input
              // fill="outline"
              placeholder="Nom complet"
              value={nom_eleve}
              onChange={(e) => setNomEleve(e.target.value!)}

            />
          </section>

          <section className="input-signup-username">
            <input type="tel"
              placeholder="Numéro de téléphone"
              value={login_eleve}
              onChange={(e) => setLoginEleve(e.target.value!)}

            />
          </section>

          <section className="select-niveau-name">
            {/* <IonLabel>Votre niveau</IonLabel> */}
            <IonSelect
              value={selectedNiveau}
              placeholder="Sélectionnez votre niveau"
              onIonChange={(e) => setSelectedNiveau(e.detail.value)}
            >
              {niveau.map((niveaux) => (
                <IonSelectOption
                
                key={niveaux.id_niveau} value={niveaux.id_niveau}>
                  {niveaux.nom_niveau}
                </IonSelectOption>
              ))}
            </IonSelect>
          </section>
          <section className="input-signup-password">
            <input
              // fill="outline"
              type="password"
              placeholder="Mot de passe"
              value={pass_eleve}
              onChange={(e) => setPassword(e.target.value!)}
            />
          </section>

          <section className="input-signup-confirm-password">
            <input
              // fill="outline"
              type="password"
              placeholder="Confirmer mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value!)}

            />
          </section>

          <section className="btn-user-signup">
            <IonButton fill="outline" onClick={handleSignup}>
              S'inscrire
            </IonButton>
          </section>

          <a onClick={handlerPushMain} className="account-btn" >J'ai un compte</a>
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
    </motion.div>
    </div>
  );
};

export default Signup;
