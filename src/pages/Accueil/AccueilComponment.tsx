import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Accueil.css";
import logoHM from "../Login/logo.jpg";
import axios from "axios";

interface Matiere {
  id_matiere: number;
  pochette_matiere: string;
  nom_matiere: string;
  description: string;
  id_prof: string;
}

const AccueilComponment: React.FC = () => {
  const [matiere, setMatiere] = useState<Matiere[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  // Premier useEffect pour récupérer les données utilisateur
  useEffect(() => {
    const userData = localStorage.getItem("user"); // Récupération des données utilisateur depuis localStorage
    if (!userData) {
      window.location.href = "/Login"; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);

  // Second useEffect pour récupérer les matières, déclenché après que 'user' soit défini
  useEffect(() => {
    if (user && user.id_niveau) {
      const fetchMatiere = async () => {
        try {
          const response = await axios.get(
            `https://hmproges.online/backendhmclassroom/category_api.php?id_niveau=${user.id_niveau}`
          );
          setMatiere(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des cours:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMatiere();
    }
  }, [user && user.id_niveau]);

  return (
    <>
      {loading ? (
        <div className="spin-content">
          <img src={logoHM} alt="" />
          <IonSpinner name="crescent" />
        </div>
      ) : (
        <div className="content-formation-accueil ion-padding">
          {matiere.map((matieres) => (
            <a href={`/details/${matieres.id_matiere}`} key={matieres.id_matiere}>
              <img src={matieres.pochette_matiere} alt={matieres?.nom_matiere} />

            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default AccueilComponment;
