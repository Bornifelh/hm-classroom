import { IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Accueil.css"
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
          <IonSpinner name="crescent" />
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