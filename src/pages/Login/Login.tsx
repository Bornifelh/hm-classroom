import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import "./Login.css";
import logoHMC from "./logo.jpg";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const Login: React.FC = () => {
  const [login_eleve, setLoginEleve] = useState("");
  const [pass_eleve, setPassword] = useState("");
  const [presentToast] = useIonToast();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

  const { login, isLoading, error, clearError } = useAuth();

  // Gestion du clic sur "Se connecter"
  const handleLogin = async () => {
    if (!login_eleve || !pass_eleve) {
      setAlertMessage("Veuillez remplir tous les champs.");
      setShowAlert(true);
      return;
    }

    try {
      await login({ login_eleve, pass_eleve });
      history.push("/Accueil");
    } catch (error) {
      setAlertMessage(
        error instanceof Error ?
          error.message
        : "Erreur de connexion. Veuillez réessayer."
      );
      setShowAlert(true);
    }
  };

  // Effacer l'erreur quand l'utilisateur ferme l'alerte
  const handleAlertDismiss = () => {
    setShowAlert(false);
    clearError();
  };

  // Ouvrir WhatsApp pour demander de l'aide
  const openWhatsApp = () => {
    const phoneNumber = "+24166193513";
    const message = encodeURIComponent(
      "Bonjour, Merci de contacter HM CLASSROOM."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#000" }}>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: toggle ? 0 : "-100vw" }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%", height: "100vh", backgroundColor: "#000" }}>
        <IonPage>
          <IonContent>
            <div className="content-login">
              <img
                className="img-login"
                src={logoHMC}
                alt="Logo HM Classroom"
              />

              <section className="input-user-compte">
                {/* <label htmlFor="phone" className="input-label">Votre numéro de téléphone</label> */}
                <input
                  type="text"
                  id="phone"
                  className="input-field"
                  placeholder="Votre numéro de téléphone"
                  value={login_eleve}
                  onChange={(e) => setLoginEleve(e.target.value)}
                  aria-label="Numéro de téléphone"
                />
              </section>

              <section className="input-user-password">
                {/* <label htmlFor="password" className="input-label">Mot de passe</label> */}
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="Mot de passe"
                  value={pass_eleve}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Mot de passe"
                />
              </section>

              <section className="btn-user-login">
                <IonButton
                  fill="outline"
                  onClick={handleLogin}
                  disabled={isLoading}>
                  {isLoading ?
                    <div className="spinner"></div>
                  : "Se connecter"}
                </IonButton>
              </section>

              <section className="btn-user-help">
                <IonButton fill="clear" onClick={openWhatsApp}>
                  Besoin d'aide ?
                </IonButton>
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
                La protection de connexion est assurée par Google reCAPTCHA.
                Assurez-vous de ne pas être un bot.
              </label>
            </div>

            <IonAlert
              isOpen={showAlert}
              onDidDismiss={handleAlertDismiss}
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
