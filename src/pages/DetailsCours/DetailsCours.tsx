import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../hooks/useSubscription";
import { SubscriptionGuard } from "../../components/SubscriptionGuard";
import { useDownload } from "../../contexts/DownloadContext";
import CircularProgress from "../../components/CircularProgress";
import "./DetailsCours.css";
import {
  FileTransferObject,
  FileTransfer,
} from "@awesome-cordova-plugins/file-transfer";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { File } from "@awesome-cordova-plugins/file";
import { Toast } from "@awesome-cordova-plugins/toast";
import { Browser } from "@capacitor/browser";
import {
  arrowRedo,
  chatboxEllipses,
  chevronBack,
  download,
  help,
} from "ionicons/icons";

// Utility function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Interfaces
interface CoursDetail {
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
  nom_prof: string;
}

const DetailsCours: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [present] = useIonToast();

  // State management
  const [cours, setCours] = useState<CoursDetail | null>(null);
  const [matiere, setMatiere] = useState<MatiereDetails | null>(null);
  const [prof, setProf] = useState<ProfDetails | null>(null);
  const [listcour, setListCour] = useState<CoursMatiereListe[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [scoreQuizz, setScoreQuizz] = useState(0);
  const [maxScore] = useState(5);

  // Utilisation du contexte d'authentification
  const { user } = useAuth();

  // Vérification de l'abonnement après 5 secondes de lecture vidéo
  useEffect(() => {
    if (user && user.abonnement === 0) {
      const timer = setTimeout(() => {
        alert(
          "Votre période d'essai a expiré. Veuillez souscrire à un abonnement pour continuer à regarder les vidéos."
        );
        history.push("/Compte");
      }, 5000); // 5 secondes

      return () => clearTimeout(timer);
    }
  }, [user, history]);

  // Fetch data method
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch course details
      const coursResponse = await axios.get(
        `https://hmproges.online/backendhmclassroom/details_cours_api.php?id_cours=${id}`
      );
      const coursData = coursResponse.data;
      setCours(coursData);

      // Fetch subject details
      if (coursData?.id_matiere) {
        const matiereResponse = await axios.get(
          `https://hmproges.online/backendhmclassroom/details_api.php?id_matiere=${coursData.id_matiere}`
        );
        setMatiere(matiereResponse.data);

        // Fetch course list for this subject
        const listCoursResponse = await axios.get(
          `https://hmproges.online/backendhmclassroom/liste_cours_api.php?id_matiere=${coursData.id_matiere}`
        );
        setListCour(listCoursResponse.data);

        // Fetch professor details
        if (matiereResponse.data?.id_prof) {
          const profResponse = await axios.get(
            `https://hmproges.online/backendhmclassroom/details_prof_api.php?id_prof=${matiereResponse.data.id_prof}`
          );
          setProf(profResponse.data);
        }
      }

      // Fetch quiz score
      if (user?.id_eleve) {
        const scoreResponse = await axios.post(
          "https://hmproges.online/backendhmclassroom/quizz_score.php",
          { id_cours: id, id_user: user.id_eleve }
        );
        setScoreQuizz(scoreResponse.data?.score || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Toast.show("Erreur de chargement des données", "long", "bottom");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Contexte de téléchargement global
  const { startDownload, updateProgress, completeDownload, isDownloading } =
    useDownload();

  // Download video method
  const downloadAndSaveVideo = async (
    videoUrl: string,
    videoTitle: string,
    imgPochette: string
  ) => {
    try {
      // Démarrer le téléchargement dans le contexte global
      const downloadId = startDownload(videoTitle, videoUrl, imgPochette);

      // Créer la base de données SQLite
      const db: SQLiteObject = await SQLite.create({
        name: "videos.db",
        location: "default",
      });

      // Créer la table si elle n'existe pas
      await db.executeSql(
        "CREATE TABLE IF NOT EXISTS videos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, filePath TEXT, imgPochette TEXT, downloadDate TEXT)",
        []
      );

      // Vérifier si la vidéo existe déjà
      const res = await db.executeSql("SELECT * FROM videos WHERE title = ?", [
        videoTitle,
      ]);
      if (res.rows.length > 0) {
        Toast.show("Cette vidéo a déjà été téléchargée.", "long", "bottom");
        return;
      }

      // Utiliser le stockage interne de l'appareil
      const fileDirectory = File.dataDirectory;
      const fileName = `${videoTitle.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;
      const filePath = `${fileDirectory}${fileName}`;

      console.log("Téléchargement vers:", filePath);

      // Télécharger la vidéo avec progression
      const fileTransfer: FileTransferObject = FileTransfer.create();

      // Écouter la progression du téléchargement
      fileTransfer.onProgress((progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          updateProgress(downloadId, progress);
        }
      });

      const entry = await fileTransfer.download(videoUrl, filePath);

      // Vérifier que le fichier a bien été créé
      const fileExists = await File.checkFile(fileDirectory, fileName);
      if (!fileExists) {
        throw new Error("Le fichier n'a pas été créé après le téléchargement");
      }

      // Enregistrer dans la base de données avec le chemin relatif
      await db.executeSql(
        "INSERT INTO videos(title, filePath, imgPochette, downloadDate) VALUES (?, ?, ?, ?)",
        [videoTitle, fileName, imgPochette, new Date().toISOString()]
      );

      // Marquer le téléchargement comme terminé
      completeDownload(downloadId);
      Toast.show("Vidéo téléchargée avec succès !", "long", "bottom");
      console.log("Vidéo enregistrée dans:", filePath);
    } catch (error) {
      console.error("Téléchargement échoué:", error);
      Toast.show("Erreur lors du téléchargement", "long", "bottom");
    }
  };

  // Open WhatsApp sharing
  const openWhatsApp = () => {
    const phoneNumber = "+24166193513";
    const message = encodeURIComponent(
      `Bonjour, Bienvenue sur notre application HM CLASSROOM. Regardez avec ${user?.nom_eleve} ce merveilleux cours sur ${cours?.titre_cours} Lien: ${cours?.video_share_link}`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  // Navigation handlers
  const handleGoBack = () => {
    history.push(`/details/${cours?.id_matiere}`);
  };

  const openWebView = async () => {
    await Browser.open({
      url: `https://www.hmproges.online/hm_classroom/chat/index.php?id_cours=${cours?.id_cours}&id_eleve=${user?.id_eleve}`,
    });
  };

  // Search handling
  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value || "");
  };

  const filteredCours =
    Array.isArray(listcour) ?
      listcour.filter((coursItem) =>
        coursItem.titre_cours.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <div className="div-row content-col">
              <IonCol size="auto">
                <IonButton fill="clear" onClick={handleGoBack}>
                  <IonIcon icon={chevronBack}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol className="name-matiere">
                <IonTitle>{matiere?.nom_matiere}</IonTitle>
              </IonCol>
            </div>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ?
          <div className="spin-content">
            <IonSpinner name="crescent" />
          </div>
        : (
          user &&
          user.abonnement === 0 &&
          user.fin_essaie < new Date().toISOString().split("T")[0]
        ) ?
          <div className="spin-content">
            <p>Redirection vers la page d'abonnement...</p>
            <IonSpinner name="crescent" />
          </div>
        : cours && (
            <div>
              <video
                className="video-cours"
                src={cours.video_link}
                autoPlay
                controls></video>

              <section className="download-others">
                <p className="text-vues">
                  <b>257 vues</b>
                </p>
                <div className="btns">
                  <IonButton routerLink={`/quizz/${cours.id_cours}`}>
                    <IonIcon icon={help} />
                  </IonButton>

                  <IonButton onClick={openWebView}>
                    <IonIcon icon={chatboxEllipses} />
                  </IonButton>

                  <IonButton
                    onClick={() =>
                      downloadAndSaveVideo(
                        cours.video_link,
                        cours.titre_cours,
                        cours.pochette_cours
                      )
                    }
                    disabled={isDownloading(cours.titre_cours)}>
                    {isDownloading(cours.titre_cours) ?
                      <CircularProgress
                        progress={0}
                        size={24}
                        strokeWidth={3}
                        showPercentage={false}
                        className="downloading"
                      />
                    : <IonIcon icon={download} />}
                  </IonButton>

                  <IonButton onClick={openWhatsApp}>
                    <IonIcon icon={arrowRedo} />
                  </IonButton>
                </div>

                {/* Indicateur de téléchargement global */}
                {isDownloading(cours.titre_cours) && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "0 10px",
                      textAlign: "center",
                    }}>
                    <CircularProgress
                      progress={0}
                      size={40}
                      strokeWidth={4}
                      showPercentage={true}
                      className="downloading"
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        margin: "8px 0 0 0",
                      }}>
                      Téléchargement en cours...
                    </p>
                  </div>
                )}
              </section>

              <section className="nom_prof">
                <p className="ion-padding">
                  Enseignant(e) : <b>{prof?.nom_prof}</b>
                </p>
              </section>

              <section className="titre">
                <h5>{cours.titre_cours}</h5>
                <div className="content-scrore">
                  {loading ?
                    <p>Chargement du score...</p>
                  : <p>
                      Score : {scoreQuizz}/{maxScore}
                    </p>
                  }
                </div>
              </section>

              <section className="details">
                <p>{cours.description_cours}</p>
              </section>
            </div>
          )
        }

        {loading ?
          <div className="spin-content">
            <IonSpinner name="crescent" />
          </div>
        : listcour && (
            <div className="content-details-formation-detail">
              <div className="details-formation">
                <div className="search-content">
                  <IonSearchbar
                    placeholder="Rechercher un cours"
                    value={searchText}
                    onIonInput={(e) => handleSearchChange(e)}></IonSearchbar>
                </div>

                <h5>Cours similaires:</h5>

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
                                {truncateText(coursItem.titre_cours || "", 40)}
                              </h5>
                              <p>{coursItem.duree_cours}</p>
                            </div>
                          </IonCol>
                        </IonRow>
                      </a>
                    ))
                  : <p>Aucun cours similaire trouvé</p>}
                </section>
              </div>
            </div>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default DetailsCours;
