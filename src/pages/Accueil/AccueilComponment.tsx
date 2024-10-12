import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Accueil.css"
import logoHM from "./LOGO HM CLASSROOM.ai 01_Plan de travail 1 copie 2.jpg";
import axios from "axios";

interface Matiere {
    id_matiere: number;
    pochette_matiere: string;
    nom_matiere: string;
    description: string;
    id_prof: string;
  }
const AccueilComponment : React.FC = () => {
    const [matiere, setMatiere] = useState<Matiere[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);  // useState utilisé correctement ici

  useEffect(() => {
    const userData = localStorage.getItem('user'); // Récupération des données utilisateur
    if (!userData) {
      window.location.href = '/Login'; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);

  useEffect(() => {
    // Fonction pour récupérer les cours depuis l'API PHP
    const fetchMatiere = async () => {
      try {
        const response = await axios.get('http://localhost/backendhmclassroom/category_api.php'); // Remplace par l'URL de ton API
        setMatiere(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatiere();
  }, []);


    return(<>
    {loading ? (
      <div className="spin-content">
          <img src={logoHM} alt="" />
          <IonSpinner name="crescent" />
      </div>
        ) : (
        <div className="content-formation-accueil ion-padding">
            {matiere.map((matieres) => (
            <a href={`/details/${matieres.id_matiere}`} key={matieres.id_matiere}>
                <img src={matieres.pochette_matiere} alt="" srcSet="" />
            </a>
            ))}
        </div>
    )}
        </>
    )
}
export default AccueilComponment;