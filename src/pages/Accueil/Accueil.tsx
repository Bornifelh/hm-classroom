import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AccueilComponment from "./AccueilComponment";


const Accueil : React.FC = () => {
    const [user, setUser] = useState<any>(null);  // useState utilisé correctement ici

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Récupération des données utilisateur
    if (!userData) {
      window.location.href = '/Login'; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);
    return(
        <IonPage>
            {/* <Header/> */}
            <IonContent  fullscreen>
                <div className="div-content-searchbar">
                    <IonSearchbar placeholder="Recherche cours..."></IonSearchbar>
                </div>
                <AccueilComponment/>
            </IonContent>
        </IonPage>
    )
}
export default Accueil;