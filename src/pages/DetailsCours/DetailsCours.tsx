import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSpinner, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./DetailsCours.css";
import {FileTransferObject, FileTransfer} from '@awesome-cordova-plugins/file-transfer';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { FileUploadOptions } from '@awesome-cordova-plugins/file-transfer';
import { useIonToast } from '@ionic/react';
import { arrowRedo, chatboxEllipses, chevronBack, download, eye, help, receipt } from "ionicons/icons";
import { File } from '@awesome-cordova-plugins/file'
import { Toast } from "@awesome-cordova-plugins/toast";
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
}

const DetailsCours: React.FC <{ cours: { video_link: string, title: string } }> = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
  const [cours, setCours] = useState<CoursDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const [user, setUser] = useState<any>(null);


  const [scoreQuizz, setScoreQuizz] = useState(0);
  const [maxScore, setMaxScore] = useState(5);

  const [present] = useIonToast();

  useEffect(() => {
    const userData = localStorage.getItem("user"); // Récupération des données utilisateur depuis localStorage
    if (!userData) {
      window.location.href = "/Login"; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get(`https://hmproges.online/backendhmclassroom/details_cours_api.php?id_cours=${id}`);
        setCours(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la matière:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [id]);

  const handleGoBack = () => {
    history.goBack();
  };

  const downloadAndSaveVideo = async (videoUrl: string, videoTitle: string, imgPochette: string,) => {
    try {
        // Message pour indiquer que le téléchargement commence
        showToast('Téléchargement en cours...');
  
        const fileTransfer: FileTransferObject = FileTransfer.create();
        const fileDirectory = File.dataDirectory; // Répertoire des fichiers
        const filePath = `${fileDirectory}${videoTitle}.mp4`; // Chemin du fichier
  
        // Téléchargement de la vidéo
        const entry = await fileTransfer.download(videoUrl, filePath);
        console.log('Fichier téléchargé à : ', entry.toURL());
  
        // Enregistrement dans la base de données SQLite
        const db: SQLiteObject = await SQLite.create({
            name: 'videos.db',
            location: 'default',
        });
  
        await db.executeSql('CREATE TABLE IF NOT EXISTS videos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, filePath TEXT)', []);
        await db.executeSql('INSERT INTO videos(title, filePath) VALUES (?, ?, ?)', [videoTitle, filePath, imgPochette]);
  
        // Afficher un toast pour indiquer la fin du téléchargement
        showToast('Vidéo téléchargée et enregistrée avec succès !');
    } catch (error) {
        console.error('Erreur lors du téléchargement/enregistrement :', error);
        showToast('Erreur lors du téléchargement de la vidéo.');
    }
  };
  

const showToast = (message: string) => {
    Toast.show(message, 'long', 'bottom').subscribe();
};


  useEffect(() => {
    const fetchScore = async () => {
      try {
        // Appel API pour récupérer le score
        const response = await axios.post('https://hmproges.online/backendhmclassroom/quizz_score.php', {
          id_cours: id,
          id_user: user?.id_eleve,
        });

        // Vérification de la réponse de l'API
        if (response.data && typeof response.data.score !== 'undefined') {
          setScoreQuizz(response.data.score); // Mettre à jour le score avec la valeur de l'API
        } else {
          // console.error("Impossible de récupérer le score.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du score:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchScore();
  }, [id, user?.id_eleve]);

  const openWhatsApp = () => {
    const phoneNumber = '+24166193513'; 
    const message = encodeURIComponent('Bonjour, Merci de contacter HM CLASSROOM.');
    
    // Créer l'URL pour ouvrir WhatsApp avec le numéro et le message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text="Bonjour, Bienvenue sur notre application HM CLASSROOM. Regarde avec "${user?.nom_eleve}" ce merveilleux cours sur "${cours?.titre_cours}" Lien: " ${cours?.video_share_link}`;
    
    // Rediriger vers l'URL de WhatsApp
    window.open(whatsappUrl, '_blank');
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonButton fill='clear' onClick={handleGoBack}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonButton>
              <IonTitle>{cours?.titre_cours}</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div className="spin-content">
            <IonSpinner name="crescent" />
          </div>
          
        ) : (
          cours && (
            <div>
              <video className="video-cours" src={cours.video_link} autoPlay controls></video>
              <section className="download-others">
                  <IonButton routerLink={`/quizz/${cours.id_cours}`}>
                    <IonIcon icon={help} />
                  </IonButton>
                <div className="btns">
                {/* <IonButton>
                    <IonIcon icon={eye} />
                  </IonButton> */}
                <IonButton routerLink={`/commentcours/${cours.id_cours}`}>
                    <IonIcon icon={chatboxEllipses} />
                  </IonButton>
                  <IonButton onClick={() => downloadAndSaveVideo(cours.video_link, cours.titre_cours, cours.pochette_cours)}>
                    <IonIcon icon={download} />
                  </IonButton>
                  <IonButton onClick={openWhatsApp}>
                      <IonIcon icon={arrowRedo} />
                  </IonButton>
                  
                </div>
                
              </section>
                <section className="titre">
                  <h5>{cours.titre_cours}</h5>
                </section>
              <section className="details">
                <p>{cours.description_cours}</p>
              </section>
            </div>
          )
        )}

        <div className="content-scrore">
        {loading ? (
          <p>Chargement du score...</p>
        ) : (
          <h4>Score : {scoreQuizz}/{maxScore}</h4> // Affichage dynamique du score
        )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetailsCours;
