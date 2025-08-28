import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonImg,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from "@ionic/react";
import React, { useEffect, useMemo, useState } from "react";
import "./Details.css";
import {
  chevronBack,
  easel,
  navigateCircle,
  playCircle,
  push,
  search,
  star,
  time,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { secureStorage } from "../../utils/security";
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
  duree_cours: string;
}

interface ProfDetails {
  id_prof: number;
  id_niveau: number;
  id_matiere: number;
  nom_prof: number;
}

interface NiveauEleve {
  id_niveau: number;
  nom_niveau: string;
  pochette_niveau: string;
}

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const DetailsFormation: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
  const [matiere, setMatiere] = useState<MatiereDetails | null>(null);
  const [cours, setCours] = useState<CoursMatiereListe[]>([]);
  const [niveau, setNiveau] = useState<NiveauEleve | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [prof, setProf] = useState<ProfDetails | null>(null);
  const [finessaie, setFinessaie] = useState<string>("");

  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Utilisation du contexte d'authentification
  const { user } = useAuth();

  

  useEffect(() => {
    const fetchMatiereDetails = async () => {
      try {
        const response = await axios.get(
          `https://hmproges.online/backendhmclassroom/details_api.php?id_matiere=${id}`
        );
        setMatiere(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la matière:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatiereDetails();
  }, [id]);

  useEffect(() => {
    const fetchNiveauEleve = async () => {
      if (user?.id_eleve && user.id_niveau) {
        try {
          const response = await axios.get(
            `https://hmproges.online/backendhmclassroom/recup_niveau_eleve.php?id_niveau=${user?.id_niveau}`
          );
          //   console.log(user.id_niveau);
          setNiveau(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de la matière:",
            error
          );
        } finally {
          setLoading(false);
        }
      } else {
        // console.error("L'utilisateur ou l'id_niveau n'est pas défini.");
      }
    };

    fetchNiveauEleve();
  }, [user]);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(
          `https://hmproges.online/backendhmclassroom/liste_cours_api.php?id_matiere=${id}`
        );
        setCours(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la matière:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, []);

  const handleGoBack = () => {
    history.push("/Accueil");
  };

  useEffect(() => {
    const fetchProf = async () => {
      if (!matiere?.id_prof) return;

      try {
        const response = await axios.get(
          `https://hmproges.online/backendhmclassroom/details_prof_api.php?id_prof=${matiere?.id_prof}`
        );
        setProf(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du professeur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProf();
  }, [matiere?.id_prof]);

  const [searchText, setSearchText] = useState("");

  // Fonction pour gérer le changement de texte dans la barre de recherche
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value || "");
  };

  // Filtrer les cours en fonction du texte de recherche
  const filteredCours =
    Array.isArray(cours) ?
      cours.filter((coursItem) =>
        coursItem.titre_cours.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="content-col">
            <IonGrid>
              <IonRow>
                <IonCol size="auto">
                  <IonButton fill="clear" onClick={handleGoBack}>
                    <IonIcon icon={chevronBack}></IonIcon>
                  </IonButton>
                </IonCol>
                <IonCol className="col-titre">
                  <h3>{matiere?.nom_matiere}</h3>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {loading ?
          <div className="spin-content">
            <IonSpinner name="crescent" />
          </div>
        : matiere && (
            <>
              <IonImg src={matiere.pochette_matiere} alt="" />

              <div className="content-details-formation-detail">
                <section className="formation-niveau-prof">
                  <h5>Votre niveau {niveau?.nom_niveau}</h5>
                  {prof && (
                    <p>
                      Enseignant(e) : <b>{prof.nom_prof}</b>
                    </p>
                  )}
                </section>

                <div className="details-formation">
                  <p>{matiere.description}</p>
                  <div className="search-content">
                    <IonSearchbar
                      placeholder="Rechercher un cours"
                      value={searchText}
                      onIonInput={(e) => handleSearchChange(e)} // Modification pour correspondre au typage
                    ></IonSearchbar>
                  </div>
                  <h5>Cours à reviser :</h5>

                  <section className="list-lessons">
                    {filteredCours.length > 0 ?
                      filteredCours.map((coursItem) => (
                        <a
                          className="lessons-link"
                          href={`/detailscours/${coursItem.id_cours}`}
                          key={coursItem.id_cours}>
                          <IonRow>
                            <IonCol size="auto">
                              <div className="content-svg-title-lessons">
                                <img
                                  className="portrait-videos"
                                  src={coursItem.pochette_cours}
                                  alt={coursItem.titre_cours}
                                />
                              </div>
                            </IonCol>
                            <IonCol>
                              <div className="content-duree-soustitre-titre">
                                <h5>
                                  {truncateText(
                                    coursItem.titre_cours || "",
                                    40
                                  )}
                                </h5>
                                <p>{coursItem.duree_cours}</p>
                              </div>
                            </IonCol>
                          </IonRow>
                        </a>
                      ))
                    : <p>Cours en préparation.</p>}
                  </section>
                </div>
              </div>
            </>
          )
        }
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Abonnement"}
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetailsFormation;
