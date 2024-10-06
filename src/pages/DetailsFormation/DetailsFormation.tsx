import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar, IonImg, IonSearchbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Details.css";
import { chevronBack, easel, navigateCircle, search, star, time } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import axios from "axios";

interface MatiereDetails {
    lessons_matiere: string;
    heure_matiere: string;
    id_matiere: number;
    pochette_matiere: string;
    nom_matiere: string;
    description: string;
    id_prof: string;
}

interface CoursMatiereListe {
    id_matiere: number;
    id_cours: number;
    video_link: string;
    video_share_link: string;
    pochette_cours: string;
    titre_cours: string;
    sous_titre_cours: string;
    description_cours: string;
    date_publication_cours: string;
}

interface ProfDetails{
    id_prof: number;
    id_niveau: number;
    id_matiere: number;
    nom_prof: number;
}


const DetailsFormation: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
    const [matiere, setMatiere] = useState<MatiereDetails | null>(null);
    const [cours, setCours] = useState<CoursMatiereListe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [prof, setProf] = useState<ProfDetails | null>(null);
  const history = useHistory();


    useEffect(() => {
        const fetchMatiereDetails = async () => {
            try {
                const response = await axios.get(`http://localhost/backendhmclassroom/details_api.php?id_matiere=${id}`);
                setMatiere(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la matière:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatiereDetails();
    }, [id]);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await axios.get(`http://localhost/backendhmclassroom/liste_cours_api.php?id_matiere=${id}`);
                setCours(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la matière:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCours();
    }, []);

    const handleGoBack = () => {
        history.goBack();
      };

      useEffect(() => {
        const fetchProf = async () => {
            if (!matiere?.id_prof) return; 
    
            try {
                const response = await axios.get(`http://localhost/backendhmclassroom/details_prof_api.php?id_prof=${matiere?.id_prof}`);
                setProf(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du professeur:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProf();
    }, [matiere?.id_prof]);
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton fill='clear' onClick={handleGoBack}>
                        <IonIcon icon={chevronBack}></IonIcon>
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {loading ? (
                    <div className="spin-content">
                        <IonSpinner name="crescent" />
                    </div>
                ) : (
                    matiere && (
                        <>
                            <IonImg src={matiere.pochette_matiere} alt="" />

                            <div className="content-details-formation-detail">
                                <section className="formation-niveau-prof">
                                    <h3>{matiere.nom_matiere}</h3>
                                    <h5>Niveau 3ème</h5>
                                    {prof && (
                                        <p>Enseignant(e) : <b>{prof.nom_prof}</b></p>
                                    )}
                                </section>

                                <div className="lessons-duree">
                                    <section>
                                        <IonIcon icon={easel}></IonIcon>
                                    <IonLabel>{matiere.lessons_matiere} Leçons</IonLabel>
                                    </section>
                                    <section>
                                        <IonIcon icon={star}></IonIcon>
                                        <IonLabel>4.7 (3.6k+)</IonLabel>
                                    </section>
                                    <section>
                                        <IonIcon icon={time}></IonIcon>
                                        <IonLabel>{matiere.heure_matiere} Heures</IonLabel>
                                    </section>
                                </div>

                                <div className="details-formation">
                                    <p>{matiere.description}</p>
                                    <h5>Cours à reviser :</h5>
                                    <div className="search-content">
                                    <IonSearchbar placeholder="Rechercher un cours"></IonSearchbar>
                                    <IonButton><IonIcon src={search}></IonIcon></IonButton>
                                    </div>

                                    <section className="list-lessons">
                                    {cours.length > 0 ? (
                                            cours.map((coursItem) => (
                                                <a
                                                    className="lessons-link"
                                                    href={`/detailscours/${coursItem.id_cours}`} 
                                                    key={coursItem.id_cours}
                                                >
                                                    <div className="content-svg-title-lessons">
                                                        <img
                                                            src={navigateCircle}
                                                            className="svg-lessons"
                                                        />
                                                        <p>{coursItem.titre_cours}</p>
                                                    </div>
                                                    <img
                                                        className="portrait-videos"
                                                        src={coursItem.pochette_cours}
                                                        alt={coursItem.titre_cours}
                                                    />
                                                </a>
                                            ))
                                        ) : (
                                            <p>Aucun cours disponible pour cette matière.</p>
                                        )}
                                    </section>
                                </div>
                            </div>
                        </>
                    )
                )}
            </IonContent>
        </IonPage>
    );
};

export default DetailsFormation;
