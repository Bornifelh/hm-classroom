import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSpinner, IonTitle, IonToolbar, IonImg } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Details.css";
import { chevronBack, easel, navigateCircle, star, time } from "ionicons/icons";
import { useParams } from "react-router";
import axios from "axios";

interface MatiereDetails {
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


const DetailsFormation: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
    const [matiere, setMatiere] = useState<MatiereDetails | null>(null);
    const [cours, setCours] = useState<CoursMatiereListe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton fill='clear' href="/">
                        <IonIcon icon={chevronBack}></IonIcon> Retour
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                {loading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    matiere && (
                        <>
                            <IonImg src={matiere.pochette_matiere} alt="" />

                            <div className="content-details-formation-detail">
                                <section className="formation-niveau-prof">
                                    <h3>{matiere.nom_matiere}</h3>
                                    <h5>Niveau 3ème</h5>
                                    <p>Professeur : <b>{matiere.id_prof}</b></p>
                                </section>

                                <div className="lessons-duree">
                                    <section>
                                        <IonIcon icon={easel}></IonIcon>
                                        <IonLabel>9 Leçons</IonLabel>
                                    </section>
                                    <section>
                                        <IonIcon icon={star}></IonIcon>
                                        <IonLabel>4.7 (3.6k+)</IonLabel>
                                    </section>
                                    <section>
                                        <IonIcon icon={time}></IonIcon>
                                        <IonLabel>90 Heures</IonLabel>
                                    </section>
                                </div>

                                <div className="details-formation">
                                    <p>{matiere.description}</p>
                                    <h5>Ce que vous apprendrez :</h5>

                                    <section className="list-lessons">
                                    {cours.length > 0 ? (
                                            cours.map((coursItem) => (
                                                <a
                                                    className="lessons-link"
                                                    href="#"
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
